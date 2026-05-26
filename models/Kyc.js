const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: String,

    documentType: {
      type: String,
    },

    aadhaarNumber: {
      type: String,
    },

    panNumber: {
      type: String,
    },

    address: String,

    dob: Date,

    idProofImage: String,

    selfieImage: String,

    status: {
      type: String,
      enum: ["UNDER_REVIEW", "APPROVED", "REJECTED"],
      default: "UNDER_REVIEW",
    },

    rejectionReason: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kyc", kycSchema);