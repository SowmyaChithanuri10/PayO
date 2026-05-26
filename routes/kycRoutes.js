const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/auth");

const {
  submitKyc
} = require("../controllers/kycController");

router.post(
  "/submit",
  authMiddleware,
  upload.fields([
    {
      name: "documentImage",
      maxCount: 1
    },
    {
      name: "selfieImage",
      maxCount: 1
    }
  ]),
  submitKyc
);

module.exports = router;