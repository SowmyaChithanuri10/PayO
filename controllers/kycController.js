const Kyc = require("../models/Kyc");


// Upload KYC
const Kyc = require("../models/Kyc");


// Upload KYC
const uploadKyc = async (req, res) => {

  try {

    const { documentType } = req.body;

    // document image
    const documentFile = req.files.document;

    // selfie image
    const selfieFile = req.files.selfieImage;


    if (!documentFile || !selfieFile) {

      return res.status(400).json({
        success: false,
        message: "Both document and selfie image required"
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

      documentImage: documentFile[0].path,

      selfieImage: selfieFile[0].path,

      status: "PENDING"

    });


    res.status(201).json({
      success: true,
      message: "KYC submitted successfully",
      data: kyc
    });

  }

  catch (error) {

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