const Kyc = require("../models/Kyc");

module.exports = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const kyc = await Kyc.findOne({ user: req.userId });

    // No KYC submitted
    if (!kyc) {
      return res.status(403).json({
        success: false,
        message: "KYC verification required",
        action: "Please submit your KYC documents to access this feature",
        kycStatus: "NOT_SUBMITTED"
      });
    }

    // KYC Pending
    if (kyc.status === "PENDING") {
      return res.status(403).json({
        success: false,
        message: "KYC verification in progress",
        action: "Your documents are being reviewed. This usually takes 24-48 hours.",
        kycStatus: "PENDING"
      });
    }

    // KYC Rejected
    if (kyc.status === "REJECTED") {
      return res.status(403).json({
        success: false,
        message: "KYC verification failed",
        reason: kyc.rejectionReason || "Please contact support for details",
        action: "Please resubmit your KYC with correct documents",
        kycStatus: "REJECTED"
      });
    }

    // KYC Approved - proceed
    next();

  } catch (error) {
    console.error("KYC Middleware Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during KYC verification"
    });
  }
};