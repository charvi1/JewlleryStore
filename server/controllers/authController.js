const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { UserName, EmailId, Password1, RoleId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password1, 10);

    // Ensure RoleId is valid; default to 'Customer' (1) if not provided or invalid
    const validRoles = [1, 2, 3, 4, 5]; // Allowed roles: Customer, Seller, Admin, Manager, Support
    const assignedRole = validRoles.includes(RoleId) ? RoleId : 1;

    const user = await User.create({ 
      UserName, 
      EmailId, 
      Password1: hashedPassword, 
      RoleId: assignedRole
    });

    res.json({ message: "User Registered Successfully", user });
  } catch (error) {
    res.status(500).json(error);
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
  console.log("req.user:", req.user); // log here too

  try {
    const user = await User.findByPk(req.user.UserId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

