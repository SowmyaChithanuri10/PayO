const express = require("express");

const router = express.Router();

const {
  getPendingKyc,
  approveKyc,
  rejectKyc
} = require("../controllers/adminKycController");


// Pending KYC list
router.get("/pending", getPendingKyc);


// Approve
router.put("/approve/:id", approveKyc);


// Reject
router.put("/reject/:id", rejectKyc);

module.exports = router;