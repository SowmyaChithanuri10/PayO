const Kyc   = require("../models/Kyc");
const User  = require("../models/User");
const path  = require("path");
 
// ─── helpers ────────────────────────────────────────────────────────────────
 
/**
 * Build a public-accessible URL for a saved file.
 * req.file.path is the absolute disk path; we expose it as /kyc-docs/<userId>/filename
 */
const toPublicUrl = (req, filePath) => {
  if (!filePath) return null;
  const rel = path.relative(path.join(__dirname, "../uploads"), filePath);
  return `${req.protocol}://${req.get("host")}/kyc-docs/${rel.replace(/\\/g, "/")}`;
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
 
    if (!files?.aadharFront?.[0] || !files?.selfie?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Aadhar front, back, and selfie are all required",
      });
    }
 
    // Wipe any previous KYC (retry flow)
    await Kyc.deleteOne({ userId: req.userId });
 
    const kyc = await Kyc.create({
      userId:       req.userId,
      documentType: "Aadhar",
      aadharFrontUrl: toPublicUrl(req, files.aadharFront[0].path),
      selfieUrl:      toPublicUrl(req, files.selfie[0].path),
      status:         "documents_uploaded",
      submissionCount: 1,
    });
 
    return res.status(201).json({
      success: true,
      message: "Aadhar documents uploaded successfully",
      kycId:  kyc._id,
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
 
    if (!files?.panCard?.[0]) {
      return res.status(400).json({
        success: false,
        message: "PAN card image and selfie are required",
      });
    }
 
    await Kyc.deleteOne({ userId: req.userId });
 
    const kyc = await Kyc.create({
      userId:       req.userId,
      documentType: "PANCard",
      panCardUrl:   toPublicUrl(req, files.panCard[0].path),
      status:       "documents_uploaded",
      submissionCount: 1,
    });
 
    return res.status(201).json({
      success: true,
      message: "PAN card documents uploaded successfully",
      kycId:  kyc._id,
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
const uploadPassportDocuments = async (req, res) => {
  try {
    const files = req.files;
 
    if (!files?.passport?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Passport image and selfie are required",
      });
    }
 
    await Kyc.deleteOne({ userId: req.userId });
 
    const kyc = await Kyc.create({
      userId:       req.userId,
      documentType: "Passport",
      passportUrl:  toPublicUrl(req, files.passport[0].path),
      status:       "documents_uploaded",
      submissionCount: 1,
    });
 
    return res.status(201).json({
      success: true,
      message: "Passport documents uploaded successfully",
      kycId:  kyc._id,
      status: kyc.status,
    });
  } catch (err) {
    console.error("uploadPassportDocuments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ════════════════════════════════════════════════════════════════════════════
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
 
// ════════════════════════════════════════════════════════════════════════════
// ── ADMIN APIs ──────────────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════════════════
 
// ADMIN — LIST ALL PENDING KYC  →  GET /api/kyc/admin/pending-reviews
const listPendingReviews = async (req, res) => {
  try {
    const pendingKycs = await Kyc.find({ status: "under_review" })
      .populate("userId", "name mobile email")
      .sort({ createdAt: 1 }); // oldest first
 
    return res.status(200).json({
      success: true,
      count: pendingKycs.length,
      kycs: pendingKycs,
    });
  } catch (err) {
    console.error("listPendingReviews error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ADMIN — APPROVE KYC  →  PATCH /api/kyc/admin/approve-kyc/:kycId
// On approval: marks KYC approved and activates user's wallet.
const approveKyc = async (req, res) => {
  try {
    const { kycId } = req.params;
 
    const kyc = await Kyc.findById(kycId);
    if (!kyc) {
      return res.status(404).json({ success: false, message: "KYC record not found" });
    }
 
    if (kyc.status !== "under_review") {
      return res.status(400).json({
        success: false,
        message: `Cannot approve. Current status: ${kyc.status}`,
      });
    }
 
    kyc.status       = "approved";
    kyc.reviewedBy   = req.userId;
    kyc.reviewedAt   = new Date();
    kyc.rejectionReason = null;
    await kyc.save();
 
    // Optionally activate wallet on User model
    await User.findByIdAndUpdate(kyc.userId, { kycVerified: true, walletActivated: true });
 
    return res.status(200).json({
      success: true,
      message: "KYC approved and wallet activated",
      kycId:  kyc._id,
      userId: kyc.userId,
    });
  } catch (err) {
    console.error("approveKyc error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ADMIN — REJECT KYC  →  PATCH /api/kyc/admin/reject-kyc/:kycId
// On rejection: data stays for audit; user must hit /reset-and-retry to restart.
const rejectKyc = async (req, res) => {
  try {
    const { kycId } = req.params;
    const { reason } = req.body;
 
    if (!reason) {
      return res.status(400).json({ success: false, message: "Rejection reason is required" });
    }
 
    const kyc = await Kyc.findById(kycId);
    if (!kyc) {
      return res.status(404).json({ success: false, message: "KYC record not found" });
    }
 
    if (kyc.status !== "under_review") {
      return res.status(400).json({
        success: false,
        message: `Cannot reject. Current status: ${kyc.status}`,
      });
    }
 
    kyc.status          = "rejected";
    kyc.reviewedBy      = req.userId;
    kyc.reviewedAt      = new Date();
    kyc.rejectionReason = reason;
    await kyc.save();
 
    return res.status(200).json({
      success: true,
      message: "KYC rejected. User will be prompted to retry.",
      kycId:  kyc._id,
      userId: kyc.userId,
      reason,
    });
  } catch (err) {
    console.error("rejectKyc error:", err);
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
  // Admin flows
  listPendingReviews,
  approveKyc,
  rejectKyc,
};