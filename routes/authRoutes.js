const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp",authController.resendOtp);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/set-pin",auth,authController.setPin);

module.exports = router;