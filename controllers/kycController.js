const User = require("../models/Kyc");

const submitKyc = async (req, res) => {
  try {

    const userId = req.userId;

    const { documentType } = req.body;

    const documentImage =
      req.files["documentImage"]?.[0]?.path || "";

    const selfieImage =
      req.files["selfieImage"]?.[0]?.path || "";

    await User.findByIdAndUpdate(userId, {
      documentType,

      idProofImage: documentImage,

      selfieImage,

      status: "UNDER_REVIEW"
    });

    res.json({
      success: true,
      message: "KYC Submitted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
module.exports = {
  submitKyc
};