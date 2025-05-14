const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

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

router.put("/update-role", authMiddleware([3]), authController.updateUserRole);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
