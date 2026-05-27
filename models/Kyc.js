const mongoose = require("mongoose");
 
const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
 
    // Screen 1/2/3 — Document Type Selection
    documentType: {
      type: String,
      enum: ["Aadhar", "PANCard", "Passport"],
      default: null,
    },
 
    // Screen 1 — Aadhar upload + selfie
    aadharFrontUrl: { type: String, default: null },
    aadharBackUrl:  { type: String, default: null },
 
    // Screen 2 — PAN Card upload
    panCardUrl: { type: String, default: null },
 
    // Screen 3 — Passport upload
    passportUrl: { type: String, default: null },
 
    // Selfie (shared across all document types)
    selfieUrl: { type: String, default: null },
 
    // KYC pipeline status
    status: {
      type: String,
      enum: [
        "not_started",      // User hasn't begun
        "documents_uploaded", // Screen 3 — submitted, awaiting review
        "under_review",     // Screen 4 — admin is checking
        "approved",         // Screen 5 — KYC passed
        "rejected",         // Screen 6 — verification failed
      ],
      default: "not_started",
    },
 
    // Admin fields
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rejectionReason: { type: String, default: null },
    reviewedAt: { type: Date, default: null },
 
    // Track submission count (for retry logic)
    submissionCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Kyc", kycSchema);
 