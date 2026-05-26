const Kyc = require("../models/Kyc");


// Get pending KYC users
const getPendingKyc = async (req, res) => {
  try {

    const users = await Kyc.find({
      status: "PENDING"
    }).populate("user", "name mobile email");

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


// Approve KYC
const approveKyc = async (req, res) => {
  try {

    const { id } = req.params;

    const kyc = await Kyc.findByIdAndUpdate(
      id,
      {
        status: "APPROVED"
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "KYC Approved",
      data: kyc
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Reject KYC
const rejectKyc = async (req, res) => {
  try {

    const { id } = req.params;

    const { reason } = req.body;

    const kyc = await Kyc.findByIdAndUpdate(
      id,
      {
        status: "REJECTED",
        rejectionReason: reason
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "KYC Rejected",
      data: kyc
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getPendingKyc,
  approveKyc,
  rejectKyc
};