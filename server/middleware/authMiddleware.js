const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = (rolesAllowed) => {
  return async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      const user = await User.findOne({ where: { UserId: req.user.UserId } });

      if (!user) return res.status(403).json({ message: "User not found" });

      if (!rolesAllowed.includes(user.RoleId)) {
        return res.status(403).json({ message: "Access Forbidden: Insufficient Permissions" });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid Token" });
    }
  };
};
