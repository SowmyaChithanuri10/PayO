// controllers/adminAuthController.js
const jwt    = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User   = require("../models/User");
 
// ════════════════════════════════════════════════════════════════════════════
// ADMIN LOGIN
// POST /api/admin/auth/login
// Same as user login but verifies the role is "admin" before issuing token.
// ════════════════════════════════════════════════════════════════════════════

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { mobile, email, password } = req.body;
    console.log("Admin login attempt:", { email, mobile, password: password ? "provided" : "missing" });

    if (!password || (!mobile && !email)) {
      return res.status(400).json({
        success: false,
        message: "Password and mobile or email are required",
      });
    }
    
    // ✅ CHECK SUPER ADMIN FIRST (BEFORE database lookup)
    // Super admin login from .env
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      console.log("✅ Super admin login successful");
      
      const token = jwt.sign(
        {
          id: "super_admin",
          role: "admin",
          superAdmin: true,
          email: process.env.ADMIN_EMAIL,
        },
        process.env.JWT_SECRET || "mysecretkey",
        { expiresIn: "12h" }
      );

      return res.status(200).json({
        success: true,
        message: "Super admin login successful",
        token,
        admin: {
          name: "Super Admin",
          email: process.env.ADMIN_EMAIL,
          mobile: process.env.ADMIN_MOBILE || "9000000000",
          role: "admin",
          superAdmin: true,
        },
      });
    }

    // ✅ ONLY THEN CHECK FOR REGULAR ADMIN IN DATABASE
    // Find user by mobile or email
    const user = await User.findOne(
      mobile ? { mobile } : { email }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with these credentials",
      });
    }

    // Check role
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. This account does not have admin privileges.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate admin JWT
    const token = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("adminLogin error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ... rest of your existing controller functions remain the same
 
// ════════════════════════════════════════════════════════════════════════════
// CREATE SUB-ADMIN  (only a super admin can do this)
// POST /api/admin/auth/create-admin
// Lets an existing admin create another admin account without touching MongoDB.
// ════════════════════════════════════════════════════════════════════════════
const createSubAdmin = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
 
    if (!name || !mobile || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, mobile, email, and password are all required",
      });
    }
 
    // Check if account already exists
    const existing = await User.findOne({ $or: [{ mobile }, { email }] });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this mobile or email already exists",
      });
    }
 
    // Password strength check
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newAdmin = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword,
      role: "admin",
    });
 
    return res.status(201).json({
      success: true,
      message: "New admin account created successfully",
      admin: {
        id:     newAdmin._id,
        name:   newAdmin.name,
        email:  newAdmin.email,
        mobile: newAdmin.mobile,
        role:   newAdmin.role,
      },
    });
  } catch (err) {
    console.error("createSubAdmin error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// GET ALL ADMINS  (see who has admin access)
// GET /api/admin/auth/all-admins
// ════════════════════════════════════════════════════════════════════════════
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" })
      .select("name email mobile createdAt")
      .sort({ createdAt: -1 });
 
    return res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (err) {
    console.error("getAllAdmins error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// REVOKE ADMIN ACCESS  (demote admin back to normal user)
// PATCH /api/admin/auth/revoke-admin/:userId
// ════════════════════════════════════════════════════════════════════════════
const revokeAdminAccess = async (req, res) => {
  try {
    const { userId } = req.params;
 
    // Prevent self-demotion
    if (userId === req.userId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot revoke your own admin access",
      });
    }
 
    const user = await User.findById(userId);
 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
 
    if (user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "This user is not an admin",
      });
    }
 
    user.role = "user";
    await user.save();
 
    return res.status(200).json({
      success: true,
      message: `Admin access revoked for ${user.name}. They are now a regular user.`,
      userId: user._id,
    });
  } catch (err) {
    console.error("revokeAdminAccess error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// CHANGE ADMIN PASSWORD
// PATCH /api/admin/auth/change-password
// Body: { currentPassword, newPassword }
// ════════════════════════════════════════════════════════════════════════════
const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
 
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "currentPassword and newPassword are required",
      });
    }
 
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }
 
    const user = await User.findById(req.userId);
 
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }
 
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
 
    return res.status(200).json({
      success: true,
      message: "Password changed successfully. Please login again with your new password.",
    });
  } catch (err) {
    console.error("changeAdminPassword error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
module.exports = {
  adminLogin,
  createSubAdmin,
  getAllAdmins,
  revokeAdminAccess,
  changeAdminPassword,
};