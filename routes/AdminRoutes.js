const express = require("express");
const router = express.Router();
const {
  getPendingKyc,
  approveKyc,
  rejectKyc,
  getKycById,
  getAllKyc
} = require("../controllers/adminKycController");

// Get all KYC applications (with optional status filter)
router.get("/all", getAllKyc);

// Pending KYC list
router.get("/pending", getPendingKyc);

// Get specific KYC by ID
router.get("/:id", getKycById);

// Approve KYC
router.put("/approve/:id", approveKyc);

// Reject KYC
router.put("/reject/:id", rejectKyc);

module.exports = router;