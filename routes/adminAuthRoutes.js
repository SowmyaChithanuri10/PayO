const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const {
  adminLogin,
  createSubAdmin,
  getAllAdmins,
  revokeAdminAccess,
  changeAdminPassword,
} = require("../controllers/adminAuthController");

// Public route - no auth required
router.post("/login", adminLogin);

// Protected routes - require admin authentication
router.use(auth, adminAuth);
router.post("/create-admin", createSubAdmin);
router.get("/all-admins", getAllAdmins);
router.patch("/revoke-admin/:userId", revokeAdminAccess);
router.patch("/change-password", changeAdminPassword);

module.exports = router;