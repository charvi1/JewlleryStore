const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = (rolesAllowed = []) => {
  return async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      const user = await User.findOne({ where: { UserId: req.user.UserId } });
      if (!user) return res.status(403).json({ message: "User not found" });

      // If rolesAllowed is provided and not empty, check access
      if (rolesAllowed.length && !rolesAllowed.includes(user.RoleId)) {
        return res.status(403).json({ message: "Access Forbidden: Insufficient Permissions" });
      }

      next();
    } catch (error) {
      console.error("Auth error:", error);
      res.status(400).json({ message: "Invalid Token" });
    }
  };
};
