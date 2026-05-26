const User = require("../models/Kyc");

const getPendingUsers = async (req, res) => {
  try {

    const users = await User.find({
      status: "UNDER_REVIEW"
    });

    res.json({
      success: true,
      data: users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const approveKyc = async (req, res) => {
  try {

    const userId = req.params.id;

    await User.findByIdAndUpdate(userId, {
      "status": "APPROVED",
      "kyc.approvedAt": new Date()
    });

    res.json({
      success: true,
      message: "KYC Approved"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const rejectKyc = async (req, res) => {
  try {

    const userId = req.params.id;

    const { reason } = req.body;

    await User.findByIdAndUpdate(userId, {
      "status": "REJECTED",
      "kyc.rejectionReason": reason
    });

    res.json({
      success: true,
      message: "KYC Rejected"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getPendingUsers,
  approveKyc,
  rejectKyc
};