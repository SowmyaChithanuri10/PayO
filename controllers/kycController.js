const Kyc = require("../models/Kyc");

// Upload KYC
const uploadKyc = async (req, res) => {
  try {
    const { documentType } = req.body;

    // Check if files exist
    if (!req.files || !req.files.document || !req.files.selfieImage) {
      return res.status(400).json({
        success: false,
        message: "Both document and selfie image are required"
      });
    }

    // Get file paths
    const documentFile = req.files.document[0];
    const selfieFile = req.files.selfieImage[0];

    if (!documentFile || !selfieFile) {
      return res.status(400).json({
        success: false,
        message: "Both document and selfie image are required"
      });
    }

    // Check existing KYC
    const existing = await Kyc.findOne({ user: req.userId });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "KYC already submitted"
      });
    }

    // Validate document type
    const validDocumentTypes = ["AADHAR", "PAN", "PASSPORT"];
    if (!validDocumentTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document type. Use: AADHAR, PAN, or PASSPORT"
      });
    }

    const kyc = await Kyc.create({
      user: req.userId,
      documentType,
      documentImage: documentFile.path,
      selfieImage: selfieFile.path,
      status: "PENDING"
    });

    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: kyc
    });
  } catch (error) {
    console.error("KYC Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to upload KYC"
    });
  }
};

// Get my KYC status
const getMyKyc = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ user: req.userId }).populate("user", "name email mobile");

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "No KYC application found"
      });
    }

    res.json({
      success: true,
      data: kyc
    });
  } catch (error) {
    console.error("Get KYC Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch KYC status"
    });
  }
};

module.exports = {
  uploadKyc,
  getMyKyc
};