const Kyc = require("../models/Kyc");

// Get pending KYC users
const getPendingKyc = async (req, res) => {
  try {
    const users = await Kyc.find({ status: "PENDING" })
      .populate("user", "name mobile email")
      .sort({ createdAt: -1 }); // Show newest first

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("Get Pending KYC Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch pending KYC requests"
    });
  }
};

// Approve KYC
const approveKyc = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if KYC exists
    const existingKyc = await Kyc.findById(id);
    if (!existingKyc) {
      return res.status(404).json({
        success: false,
        message: "KYC application not found"
      });
    }

    // Check if already approved or rejected
    if (existingKyc.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: `Cannot approve KYC that is already ${existingKyc.status.toLowerCase()}`
      });
    }

    const kyc = await Kyc.findByIdAndUpdate(
      id,
      {
        status: "APPROVED",
        rejectionReason: null // Clear any previous rejection reason
      },
      { new: true }
    ).populate("user", "name email mobile");

    res.json({
      success: true,
      message: "KYC approved successfully",
      data: kyc
    });
  } catch (error) {
    console.error("Approve KYC Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to approve KYC"
    });
  }
};

// Reject KYC
const rejectKyc = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // Validate rejection reason
    if (!reason || reason.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required"
      });
    }

    // Check if KYC exists
    const existingKyc = await Kyc.findById(id);
    if (!existingKyc) {
      return res.status(404).json({
        success: false,
        message: "KYC application not found"
      });
    }

    // Check if already approved or rejected
    if (existingKyc.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: `Cannot reject KYC that is already ${existingKyc.status.toLowerCase()}`
      });
    }

    const kyc = await Kyc.findByIdAndUpdate(
      id,
      {
        status: "REJECTED",
        rejectionReason: reason.trim()
      },
      { new: true }
    ).populate("user", "name email mobile");

    res.json({
      success: true,
      message: "KYC rejected successfully",
      data: kyc
    });
  } catch (error) {
    console.error("Reject KYC Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to reject KYC"
    });
  }
};

// Get KYC by ID (optional utility function)
const getKycById = async (req, res) => {
  try {
    const { id } = req.params;
    const kyc = await Kyc.findById(id).populate("user", "name email mobile");

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC application not found"
      });
    }

    res.json({
      success: true,
      data: kyc
    });
  } catch (error) {
    console.error("Get KYC By ID Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch KYC"
    });
  }
};

// Get all KYC applications (with filter)
const getAllKyc = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status && ["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      filter.status = status;
    }

    const kycs = await Kyc.find(filter)
      .populate("user", "name email mobile")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: kycs.length,
      data: kycs
    });
  } catch (error) {
    console.error("Get All KYC Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch KYC applications"
    });
  }
};

module.exports = {
  getPendingKyc,
  approveKyc,
  rejectKyc,
  getKycById,
  getAllKyc
};