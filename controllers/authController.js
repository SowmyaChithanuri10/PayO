const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");
const Otp = require("../models/Otp");

const { generateWalletAddress, generateQR } = require("../utils/helpers");
// ======================register========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, referralCode } = req.body;

    // ================= TOKEN =================
   const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "No token or invalid format" });
}

const token = authHeader.split(" ")[1];



    const decoded = jwt.verify(token, "mysecretkey");
    const mobile = decoded.mobile;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile missing" });
    }

    // ================= VALIDATIONS =================
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords mismatch" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existMobile = await User.findOne({ mobile });
    if (existMobile) {
      return res.status(400).json({ message: "Mobile already exists" });
    }

    const otpRecord = await Otp.findOne({ mobile, isVerified: true });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    // ================= CREATE USER =================
    const hash = await bcrypt.hash(password, 10);
    const myReferral = "PAYO" + uuidv4().slice(0, 6);

    const user = await User.create({
      name,
      email,
      password: hash,
      mobile,
      referralcode: referralCode || null,
      myReferralCode: myReferral,
      isVerified: true
    });

    // ================= CREATE WALLET =================
    const walletAddress = generateWalletAddress();
    const qr = await generateQR(walletAddress);

    const wallet = await Wallet.create({
      userId: user._id,
      walletAddress,
      walletExpiry: Date.now() + 60 * 60 * 1000,
      qrCode: qr,
      qrExpiry: Date.now() + 15 * 60 * 1000
    });

    // link wallet to user
    await User.findByIdAndUpdate(user._id, { walletId: wallet._id });

    // ================= REFERRAL BONUS =================
    const REFERRAL_BONUS = 50;

    if (referralCode) {
      const referrer = await User.findOne({ myReferralCode: referralCode });

      // prevent self-referral
      if (referrer && referrer._id.toString() !== user._id.toString()) {

        const referrerWallet = await Wallet.findOne({ userId: referrer._id });
        const newUserWallet = await Wallet.findOne({ userId: user._id });

        if (referrerWallet && newUserWallet) {

          // credit referrer
          referrerWallet.balance += REFERRAL_BONUS;
          await referrerWallet.save();

          await Transaction.create({
            userId: referrer._id,
            amount: REFERRAL_BONUS,
            type: "credit",
            message: "Referral bonus received"
          });

          // credit new user
          newUserWallet.balance += REFERRAL_BONUS;
          await newUserWallet.save();

          await Transaction.create({
            userId: user._id,
            amount: REFERRAL_BONUS,
            type: "credit",
            message: "Referral bonus for joining"
          });
        }
      }
    }

    // ================= CLEANUP =================
    await Otp.deleteOne({ mobile });

    // ================= RESPONSE =================
    res.status(201).json({
      message: "Registered successfully",
      myReferralCode: user.myReferralCode,
      wallet: {
        walletAddress: wallet.walletAddress,
        balance: wallet.balance
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// ======================login========================
exports.login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    let user = email
      ? await User.findOne({ email })
      : await User.findOne({ mobile });

    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, mobile: user.mobile },
      "mysecretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login success", token });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// ======================resend otp========================
exports.resendOtp=async (req, res) => {
  const { mobile } = req.body;

  const record = await Otp.findOne({ mobile });

  if (!record) {
    return res.status(400).json({ message: "Please request OTP first" });
  }

  const now = Date.now();

  if (record.expiresAt > now) {
    return res.status(400).json({
      message: "OTP still valid. Please wait before resending",
    });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  record.otp = hashedOtp;
  record.isVerified = false;
  record.expiresAt = now + 2 * 60 * 1000;

  await record.save();

  console.log("New OTP:", otp);

  res.json({ message: "OTP resent",otp });
};

// ====================verify otp========================

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const record = await Otp.findOne({ mobile });

    if (!record || !record.otp) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Expired OTP" });
    }

    const isMatch = await bcrypt.compare(String(otp).trim(), record.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    record.isVerified = true;
    await record.save();

    const token = jwt.sign({ mobile }, "mysecretkey", {
      expiresIn: "1h",
    });

    return res.json({ message: "OTP verified", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ======================send otp========================



exports.sendOtp=async (req, res) => {
  const { mobile } = req.body;

  if (!/^[0-9]{10}$/.test(mobile)) {
    return res.status(400).json({ message: "Invalid mobile" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // hash OTP
  const hashedOtp = await bcrypt.hash(otp, 10);

  await Otp.findOneAndUpdate(
  { mobile },
  {
    $set: {
      otp: hashedOtp,
      isVerified: false,
      expiresAt: Date.now() + 2 * 60 * 1000
    }
  },
  { upsert: true, new: true }
);

  console.log("OTP:", otp);

  res.json({ message: "OTP sent" ,otp});
};

// ================= set pin =================

exports.setPin=async (req, res) => {
  try {
    
 
    const { pin } = req.body;
 
    if (!pin) {
      return res.status(400).json({ message: "PIN is required" });
    }
 
    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({ message: "PIN must be 4 digits" });
    }
 
    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token (no userId)" });
    }
 
    const user = await User.findById(req.userId);
 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const hashedPin = await bcrypt.hash(pin, 10);
 
    user.transactionPin = hashedPin;
    await user.save();
 
    res.json({ message: "Transaction PIN set successfully " });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error setting PIN" });
  }
};