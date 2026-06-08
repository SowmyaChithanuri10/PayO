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
  getAllUsers, // ADD THIS
  getUserBankDetails,
} = require("../controllers/adminAuthController");

// Public route
router.post("/login", adminLogin);

// Protected routes
router.use(auth, adminAuth);

router.post("/create-admin", createSubAdmin);

router.get("/all-admins", getAllAdmins);

// ADD THIS ROUTE
router.get("/users", getAllUsers);

router.get("/user-bank-details/:userId", getUserBankDetails);

router.patch("/revoke-admin/:userId", revokeAdminAccess);

router.patch("/change-password", changeAdminPassword);

module.exports = router;