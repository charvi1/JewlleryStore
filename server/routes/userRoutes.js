// routes/userRoutes.js

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { upload, handleMulterError } = require("../multerConfig.cjs");
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const crypto = require('crypto');
const User = require('../models/User');  // Adjust the path to where your User model is located
const { Op } = require('sequelize');

// your User model
const sendEmail = require('../utils/sendEmail'); // email sending function

 
  
router.post(
  "/register",
  [
    check("UserName", "Name is required").not().isEmpty(),
    check("EmailId", "Valid email is required").isEmail(),
    check("Password1", "Password must be 6+ characters").isLength({ min: 6 }),
  ],
  authController.register
);

router.post("/login", authController.login);

router.get("/all-users", authMiddleware([2, 3]), authController.getAllUsers);

router.put("/update-role", authMiddleware([1]), authController.updateUserRole);

router.get("/me", authMiddleware([1, 2]), authController.getMe);

router.post("/setPhoto", 
    authMiddleware([1, 2]), 
    upload.single('image'),
    handleMulterError,
    authController.setUserPhoto
);
router.patch("/me", authMiddleware([1, 2]), authController.updateMe);


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);

  try {
    const user = await User.findOne({ where: { EmailId: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHashed = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.PasswordResetToken = resetTokenHashed;
    user.PasswordResetExpires = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const htmlMessage = `
      <p>Hello ${user.UserName || ''},</p>
      <p>You requested to reset your password. Click the link below to create a new one:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you didn’t request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
      <br />
      <p>— Zebaish Team</p>
    `;

    await sendEmail({
      email: user.EmailId,
      subject: "Password Reset Request",
      html: htmlMessage, // use html if supported
    });

    res.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


const bcrypt = require('bcryptjs');

router.post('/reset-password/:token', async (req, res) => {
  const resetToken = req.params.token;
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: "Password is required" });

  const resetTokenHashed = crypto.createHash('sha256').update(resetToken).digest('hex');

  try {
    const user = await User.findOne({
      where: {
        PasswordResetToken: resetTokenHashed,
        PasswordResetExpires: { [Op.gt]: Date.now() },
      }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.Password1 = await bcrypt.hash(password, salt);

    user.PasswordResetToken = null;
    user.PasswordResetExpires = null;

    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;