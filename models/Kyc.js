const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true // Ensure one KYC per user
  },

  documentType: {
    type: String,
    enum: ["AADHAR", "PAN", "PASSPORT"],
    required: true
  },

  documentImage: {
    type: String,
    required: true
  },

  selfieImage: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  rejectionReason: {
    type: String,
    default: null
  }

}, {
  timestamps: true
});

// Add index for better query performance
kycSchema.index({ user: 1 });
kycSchema.index({ status: 1 });
kycSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Kyc", kycSchema);