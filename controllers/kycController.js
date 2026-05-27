const Kyc   = require("../models/Kyc");
const User  = require("../models/User");
const path  = require("path");
 
// ─── helpers ────────────────────────────────────────────────────────────────
 
/**
 * Build a public-accessible URL for a saved file.
 * req.file.path is the absolute disk path; we expose it as /kyc-docs/<userId>/filename
 */
// In kycController.js, update the toPublicUrl function:
const toPublicUrl = (req, filePath) => {
  if (!filePath) return null;
  // Get relative path from uploads folder
  const relativePath = path.relative(path.join(__dirname, "../uploads"), filePath);
  // Convert Windows backslashes to forward slashes
  const normalizedPath = relativePath.replace(/\\/g, "/");
  return `${req.protocol}://${req.get("host")}/kyc-docs/${normalizedPath}`;
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — GET KYC STATUS  →  GET /api/kyc/verification-status
// Returns current KYC record (or "not_started") so the app knows which screen
// to show on launch.
// ════════════════════════════════════════════════════════════════════════════
const getVerificationStatus = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });
 
    if (!kyc) {
      return res.status(200).json({
        success: true,
        status: "not_started",
        kyc: null,
        message: "KYC not initiated yet",
      });
    }
 
    return res.status(200).json({
      success: true,
      status: kyc.status,
      kyc: {
        documentType:   kyc.documentType,
        status:         kyc.status,
        rejectionReason: kyc.rejectionReason,
        submissionCount: kyc.submissionCount,
        updatedAt:      kyc.updatedAt,
      },
    });
  } catch (err) {
    console.error("getVerificationStatus error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — UPLOAD AADHAR DOCUMENTS  →  POST /api/kyc/upload-aadhar-documents
// Accepts: aadharFront (file), aadharBack (file), selfie (file)
// ════════════════════════════════════════════════════════════════════════════
const uploadAadharDocuments = async (req, res) => {
  try {
    const files = req.files;
    
    console.log("Files received:", Object.keys(files));

    // Only Aadhar front and selfie required (NO back)
    if (!files?.aadharFront?.[0] || !files?.selfie?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Aadhar front and selfie are required",
      });
    }

    const existing = await Kyc.findOne({ userId: req.userId });
    await Kyc.deleteOne({ userId: req.userId });

    const kyc = await Kyc.create({
      userId: req.userId,
      documentType: "Aadhar",
      aadharFrontUrl: toPublicUrl(req, files.aadharFront[0].path),
      // aadharBackUrl: NOT saved (not required)
      selfieUrl: toPublicUrl(req, files.selfie[0].path),
      status: "documents_uploaded",
      submissionCount: (existing?.submissionCount || 0) + 1,
    });

    return res.status(201).json({
      success: true,
      message: "Aadhar documents uploaded successfully",
      kycId: kyc._id,
      status: kyc.status,
    });
  } catch (err) {
    console.error("uploadAadharDocuments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — UPLOAD PAN CARD  →  POST /api/kyc/upload-pan-documents
// Accepts: panCard (file), selfie (file)
// ════════════════════════════════════════════════════════════════════════════
const uploadPanDocuments = async (req, res) => {
  try {
    const files = req.files;
    
    console.log("Files received:", Object.keys(files));

    // Only PAN card required, NO selfie
    if (!files?.panCard?.[0]) {
      return res.status(400).json({
        success: false,
        message: "PAN card image is required",
      });
    }

    const existing = await Kyc.findOne({ userId: req.userId });
    await Kyc.deleteOne({ userId: req.userId });

    const kyc = await Kyc.create({
      userId: req.userId,
      documentType: "PANCard",
      panCardUrl: toPublicUrl(req, files.panCard[0].path),
      // selfieUrl: NOT saved for PAN
      status: "documents_uploaded",
      submissionCount: (existing?.submissionCount || 0) + 1,
    });

    return res.status(201).json({
      success: true,
      message: "PAN card uploaded successfully",
      kycId: kyc._id,
      status: kyc.status,
    });
  } catch (err) {
    console.error("uploadPanDocuments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — UPLOAD PASSPORT  →  POST /api/kyc/upload-passport-documents
// Accepts: passport (file), selfie (file)
// ════════════════════════════════════════════════════════════════════════════
// In kycController.js - Update uploadPassportDocuments
const uploadPassportDocuments = async (req, res) => {
  try {
    const files = req.files;
    
    console.log("Files received:", Object.keys(files));

    // Only Passport required, NO selfie
    if (!files?.passport?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Passport image is required",
      });
    }

    const existing = await Kyc.findOne({ userId: req.userId });
    await Kyc.deleteOne({ userId: req.userId });

    const kyc = await Kyc.create({
      userId: req.userId,
      documentType: "Passport",
      passportUrl: toPublicUrl(req, files.passport[0].path),
      // selfieUrl: NOT saved for Passport
      status: "documents_uploaded",
      submissionCount: (existing?.submissionCount || 0) + 1,
    });

    return res.status(201).json({
      success: true,
      message: "Passport uploaded successfully",
      kycId: kyc._id,
      status: kyc.status,
    });
  } catch (err) {
    console.error("uploadPassportDocuments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//════════════════════════════════════════════════════════════════════════════
// SCREEN 3 → SCREEN 4  —  SUBMIT FOR REVIEW  →  POST /api/kyc/submit-for-review
// Marks the KYC as "under_review". Call this after uploading documents to
// trigger the "Under Review" screen (Screen 4).
// ════════════════════════════════════════════════════════════════════════════
const submitForReview = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });
 
    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "No KYC record found. Please upload documents first.",
      });
    }
 
    if (kyc.status !== "documents_uploaded") {
      return res.status(400).json({
        success: false,
        message: `Cannot submit for review. Current status: ${kyc.status}`,
      });
    }
 
    kyc.status = "under_review";
    await kyc.save();
 
    return res.status(200).json({
      success: true,
      message: "KYC submitted for review successfully",
      status: kyc.status,
      pipeline: {
        accountCreated:      "Completed",
        documentsUploaded:   "Completed",
        kycVerification:     "Pending",
        walletActivated:     "Pending",
      },
    });
  } catch (err) {
    console.error("submitForReview error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 4 — POLL REVIEW PIPELINE  →  GET /api/kyc/review-pipeline-status
// Front-end polls this to animate the checklist on Screen 4.
// ════════════════════════════════════════════════════════════════════════════
const getReviewPipelineStatus = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });
 
    if (!kyc) {
      return res.status(404).json({ success: false, message: "KYC record not found" });
    }
 
    const isApproved  = kyc.status === "approved";
    const isRejected  = kyc.status === "rejected";
    const inReview    = kyc.status === "under_review";
 
    return res.status(200).json({
      success: true,
      status:  kyc.status,
      pipeline: {
        accountCreated:    "Completed",
        documentsUploaded: "Completed",
        kycVerification:   isApproved ? "Completed" : isRejected ? "Failed" : "Pending",
        walletActivated:   isApproved ? "Completed" : "Pending",
      },
    });
  } catch (err) {
    console.error("getReviewPipelineStatus error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 5 — KYC APPROVED CONFIRMATION  →  GET /api/kyc/approval-confirmation
// Returns the approved KYC record so Screen 5 can show the tick + wallet info.
// ════════════════════════════════════════════════════════════════════════════
const getApprovalConfirmation = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });
 
    if (!kyc || kyc.status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "KYC is not approved yet",
        status: kyc?.status ?? "not_started",
      });
    }
 
    return res.status(200).json({
      success: true,
      message: "KYC approved! Your wallet is now fully activated.",
      status: "approved",
      approvedAt: kyc.reviewedAt,
    });
  } catch (err) {
    console.error("getApprovalConfirmation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 6 — VERIFICATION FAILED  →  GET /api/kyc/rejection-details
// Returns why the KYC was rejected so Screen 6 can display the reason.
// ════════════════════════════════════════════════════════════════════════════
const getRejectionDetails = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });
 
    if (!kyc || kyc.status !== "rejected") {
      return res.status(403).json({
        success: false,
        message: "No rejection record found",
        status: kyc?.status ?? "not_started",
      });
    }
 
    return res.status(200).json({
      success: true,
      status: "rejected",
      rejectionReason: kyc.rejectionReason || "Documents could not be verified",
      submissionCount: kyc.submissionCount,
      tips: [
        "Aadhar & PAN details must match exactly",
        "Images must be clear and not cropped",
        "Do not hide or alter any part of your face",
      ],
    });
  } catch (err) {
    console.error("getRejectionDetails error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
// SCREEN 6 — RETRY KYC  →  DELETE /api/kyc/reset-and-retry
// Wipes the rejected KYC so the user can start fresh (Screen 1 again).
// ════════════════════════════════════════════════════════════════════════════
const resetAndRetry = async (req, res) => {
  try {
    const kyc = await Kyc.findOne({ userId: req.userId });
 
    if (!kyc) {
      return res.status(404).json({ success: false, message: "No KYC record found" });
    }
 
    if (kyc.status !== "rejected") {
      return res.status(400).json({
        success: false,
        message: `Cannot retry. Current status: ${kyc.status}`,
      });
    }
 
    // Store count before deleting
    const previousCount = kyc.submissionCount;
    await Kyc.deleteOne({ userId: req.userId });
 
    return res.status(200).json({
      success: true,
      message: "KYC data cleared. You may upload your documents again.",
      previousSubmissions: previousCount,
    });
  } catch (err) {
    console.error("resetAndRetry error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 

 
module.exports = {
  // User flows
  getVerificationStatus,
  uploadAadharDocuments,
  uploadPanDocuments,
  uploadPassportDocuments,
  submitForReview,
  getReviewPipelineStatus,
  getApprovalConfirmation,
  getRejectionDetails,
  resetAndRetry,
  
};