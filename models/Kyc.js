const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one KYC per user
    },

    fullName: String,

    aadhaarNumber: {
      type: String,
    },

    panNumber: {
      type: String,
    },

    address: String,

    dob: Date,

    idProofImage: String, // uploaded file path

    selfieImage: String, // selfie verification

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    rejectionReason: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Kyc", kycSchema);