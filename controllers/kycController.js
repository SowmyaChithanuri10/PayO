const User = require("../models/Kyc");

const submitKyc = async (req, res) => {
  try {

    const userId = req.user.id;

    const { documentType } = req.body;

    const documentImage =
      req.files["documentImage"]?.[0]?.path || "";

    const selfieImage =
      req.files["selfieImage"]?.[0]?.path || "";

    await User.findByIdAndUpdate(userId, {
      kyc: {
        documentType,
        documentImage,
        selfieImage,

        status: "UNDER_REVIEW",

        submittedAt: new Date()
      }
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