const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { UserName, EmailId, Password1, RoleId } = req.body;

  if (!UserName || !EmailId || !Password1) {
    return res.status(400).json({ message: "UserName, EmailId, and Password1 are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password1, 10);

    const validRoles = [1, 2, 3, 4, 5];
    const roleIdInt = parseInt(RoleId, 10);
    const assignedRole = validRoles.includes(roleIdInt) ? roleIdInt : 1;

    const user = await User.create({
      UserName,
      EmailId,
      Password1: hashedPassword,
      RoleId: assignedRole,
    });

    res.json({ message: "User Registered Successfully", user });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};


exports.login = async (req, res) => {
  const { EmailId, Password1 } = req.body;

  try {
    const user = await User.findOne({ where: { EmailId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(Password1, user.Password1);

    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
  console.log(`Password Match: ${isMatch}`);
    const token = jwt.sign({ UserId: user.UserId, RoleId: user.RoleId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        UserId: user.UserId,
        UserName: user.UserName,
        EmailId: user.EmailId,
        RoleId: user.RoleId
      }
    });
    
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateUserRole = async (req, res) => {
  const { UserId, RoleId } = req.body;

  if (![1, 2, 3].includes(RoleId)) return res.status(400).json({ message: "Invalid RoleId" });

  try {
    const updated = await User.update({ RoleId }, { where: { UserId } });

    if (updated[0] === 0) return res.status(404).json({ message: "User not found" });

    res.json({ message: `User role updated to ${RoleId}` });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { UserId: req.user.UserId },
      attributes: ["UserId", "UserName", "EmailId", "RoleId"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.setUserPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const user = await User.findOne({
            where: { UserId: req.user.UserId }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update user's photo URL
        await user.update({
            URL: req.file.path
        });

        res.json({
            success: true,
            message: 'Profile picture updated successfully',
            updatedUser: {
                ...user.toJSON(),
                URL: req.file.path
            }
        });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile picture'
        });
    }
};

exports.updateMe = async (req, res) => {
  try {
    const user = await User.findOne({ where: { UserId: req.user.UserId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const allowedFields = ["UserName", "PhoneNumber", "Gender", "DOB", "Location", "AlternatePhone", "HintName"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    await user.update(updates);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: user.toJSON()
    });
  } catch (error) {
    console.error("UpdateMe error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};
