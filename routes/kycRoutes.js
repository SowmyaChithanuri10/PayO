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
  "/aadhar-upload",
  auth,
  upload.fields([
  { name: "document", maxCount: 1 },
  { name: "selfieImage", maxCount: 1 }
]),
  uploadKyc
);


// Get KYC Status
router.get(
  "/me",
  auth,
  getMyKyc
);

module.exports = router;