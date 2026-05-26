const Kyc = require("../models/Kyc");


// Upload KYC
const uploadKyc = async (req, res) => {
  try {

    const { documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Document image required"
      });
    }

    // check existing kyc
    const existing = await Kyc.findOne({
      user: req.userId
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "KYC already submitted"
      });
    }

    const kyc = await Kyc.create({
      user: req.userId,
      documentType,
      documentImage: req.file.path,
      status: "PENDING"
    });

    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: kyc
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Get my KYC status
const getMyKyc = async (req, res) => {
  try {

    const kyc = await Kyc.findOne({
      user: req.userId
    });

    res.json({
      success: true,
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
  uploadKyc,
  getMyKyc
};