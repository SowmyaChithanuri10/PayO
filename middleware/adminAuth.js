const User = require("../models/User");
 
/**
 * adminAuth middleware
 * Must be used AFTER the regular `auth` middleware so req.userId is available.
 * Blocks any non-admin user from reaching admin routes.
 */
module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
 
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }
 
    req.adminUser = user; // attach admin user to request for use in controllers
    next();
  } catch (err) {
    console.error("adminAuth error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 