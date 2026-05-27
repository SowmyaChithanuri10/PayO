const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Check if it's super admin (no user record)
    if (req.userId === "super_admin") {
      req.adminUser = {
        _id: "super_admin",
        name: "Super Admin",
        role: "admin",
        superAdmin: true
      };
      return next();
    }

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
 
    req.adminUser = user;
    next();
  } catch (err) {
    console.error("adminAuth error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};