const Kyc = require("../models/Kyc");

module.exports = async (req, res, next) => {

  try {

    const kyc = await Kyc.findOne({
      user: req.userId
    });

    // No KYC
    if (!kyc) {
      return res.status(403).json({
        success: false,
        message: "Please complete KYC"
      });
    }

    // Pending
    if (kyc.status === "PENDING") {
      return res.status(403).json({
        success: false,
        message: "KYC under review"
      });
    }

    // Rejected
    if (kyc.status === "REJECTED") {
      return res.status(403).json({
        success: false,
        message: "KYC rejected",
        reason: kyc.rejectionReason
      });
    }

    next();

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};