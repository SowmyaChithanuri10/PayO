const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
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

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },

  rejectionReason: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Kyc", kycSchema);