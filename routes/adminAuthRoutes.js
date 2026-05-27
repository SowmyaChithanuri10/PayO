const express  = require("express");
const router   = express.Router();
 
const auth      = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
 
const {
  adminLogin,
  createSubAdmin,
  getAllAdmins,
  revokeAdminAccess,
  changeAdminPassword,
} = require("../controllers/adminAuthController");
 
// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC — no token needed
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * POST /api/admin/auth/login
 * Login with mobile/email + password.
 * Returns a token only if the account has role = "admin".
 */
router.post("/login", adminLogin);
 
// ─────────────────────────────────────────────────────────────────────────────
// PROTECTED — needs valid admin token
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * POST /api/admin/auth/create-admin
 * Create a new admin account without touching MongoDB.
 * Only an existing admin can call this.
 */
router.post("/create-admin", auth, adminAuth, createSubAdmin);
 
/**
 * GET /api/admin/auth/all-admins
 * List all accounts that have admin access.
 */
router.get("/all-admins", auth, adminAuth, getAllAdmins);
 
/**
 * PATCH /api/admin/auth/revoke-admin/:userId
 * Demote an admin back to a normal user.
 */
router.patch("/revoke-admin/:userId", auth, adminAuth, revokeAdminAccess);
 
/**
 * PATCH /api/admin/auth/change-password
 * Change your own admin password.
 * Body: { currentPassword, newPassword }
 */
router.patch("/change-password", auth, adminAuth, changeAdminPassword);
 
module.exports = router;