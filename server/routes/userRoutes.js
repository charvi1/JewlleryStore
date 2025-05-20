// routes/userRoutes.js

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { upload, handleMulterError } = require("../multerConfig.cjs");
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

router.put("/update-role", authMiddleware([1]), authController.updateUserRole);

router.get("/me", authMiddleware([1, 2]), authController.getMe);

router.post("/setPhoto", 
    authMiddleware([1, 2]), 
    upload.single('image'),
    handleMulterError,
    authController.setUserPhoto
);
router.patch("/me", authMiddleware([1, 2]), authController.updateMe);

module.exports = router;
