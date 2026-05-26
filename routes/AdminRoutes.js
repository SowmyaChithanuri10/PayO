const express = require("express");

const router = express.Router();

const {
  getPendingUsers,
  approveKyc,
  rejectKyc
} = require("../controllers/adminKycController");

router.get("/pending", getPendingUsers);

router.put("/approve/:id", approveKyc);

router.put("/reject/:id", rejectKyc);

module.exports = router;