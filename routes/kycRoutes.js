const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const upload = require("../middleware/uploadMiddleware");

const {
  uploadKyc,
  getMyKyc
} = require("../controllers/kycController");


// Upload KYC
router.post(
  "/upload",
  auth,
  upload.single("document"),
  uploadKyc
);


// Get KYC Status
router.get(
  "/me",
  auth,
  getMyKyc
);

module.exports = router;