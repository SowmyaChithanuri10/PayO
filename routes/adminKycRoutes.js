const express  = require("express");
const router   = express.Router();
 
const auth      = require("../middleware/auth");       // your existing JWT middleware
const adminAuth = require("../middleware/adminAuth");   // new admin guard
 
const {
  getDashboardStats,
  getAllSubmissions,
  listPendingReviews,
  getSubmissionDetails,
  approveVerification,
  rejectVerification,
  bulkApprove,
  bulkReject,
  searchUserKyc,
  deleteKycRecord,
  getAuditLog,
} = require("../controllers/Adminkyccontroller");
 
// ─────────────────────────────────────────────────────────────────────────────
// ALL admin routes require:
//   1. Valid JWT token (auth)
//   2. User role === "admin" (adminAuth)
// ─────────────────────────────────────────────────────────────────────────────
router.use(auth, adminAuth);
 
// ══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
 
/**
 * GET /api/admin/kyc/dashboard-stats
 * Summary counts per status: pending, approved, rejected, total.
 * Use this to populate the admin dashboard cards.
 */
router.get("/dashboard-stats", getDashboardStats);
 
// ══════════════════════════════════════════════════════════════════════════════
//  LISTING & SEARCH
// ══════════════════════════════════════════════════════════════════════════════
 
/**
 * GET /api/admin/kyc/all-submissions
 * All KYC records with optional filters.
 * Query params:
 *   ?status=under_review|approved|rejected|documents_uploaded
 *   ?page=1&limit=20
 */
router.get("/all-submissions", getAllSubmissions);
 
/**
 * GET /api/admin/kyc/pending-reviews
 * Only "under_review" records, oldest first (FIFO queue for admins).
 */
router.get("/pending-reviews", listPendingReviews);
 
/**
 * GET /api/admin/kyc/search-user?query=<mobile|email|name>
 * Search for a specific user's KYC by their mobile number, email, or name.
 */
router.get("/search-user", searchUserKyc);
 
/**
 * GET /api/admin/kyc/submission-details/:kycId
 * Full KYC record with all document URLs, user info, and reviewer info.
 */
router.get("/submission-details/:kycId", getSubmissionDetails);
 
// ══════════════════════════════════════════════════════════════════════════════
//  SINGLE RECORD ACTIONS
// ══════════════════════════════════════════════════════════════════════════════
 
/**
 * PATCH /api/admin/kyc/approve-verification/:kycId
 * Approves KYC → user sees Screen 5, wallet is activated.
 * No body required.
 */
router.patch("/approve-verification/:kycId", approveVerification);
 
/**
 * PATCH /api/admin/kyc/reject-verification/:kycId
 * Rejects KYC → user sees Screen 6 with the reason.
 * Body: { "reason": "Aadhar details do not match PAN" }
 */
router.patch("/reject-verification/:kycId", rejectVerification);
 
/**
 * DELETE /api/admin/kyc/delete-record/:kycId
 * Hard deletes a KYC record (only rejected records — approved ones are protected).
 * Use for data cleanup only.
 */
router.delete("/delete-record/:kycId", deleteKycRecord);
 
// ══════════════════════════════════════════════════════════════════════════════
//  BULK ACTIONS
// ══════════════════════════════════════════════════════════════════════════════
 
/**
 * PATCH /api/admin/kyc/bulk-approve
 * Approve multiple KYC submissions in one call.
 * Body: { "kycIds": ["id1", "id2", "id3"] }
 */
router.patch("/bulk-approve", bulkApprove);
 
/**
 * PATCH /api/admin/kyc/bulk-reject
 * Reject multiple KYC submissions with the same reason.
 * Body: { "kycIds": ["id1", "id2"], "reason": "Documents unclear" }
 */
router.patch("/bulk-reject", bulkReject);
 
// ══════════════════════════════════════════════════════════════════════════════
//  AUDIT LOG
// ══════════════════════════════════════════════════════════════════════════════
 
/**
 * GET /api/admin/kyc/audit-log
 * All reviewed KYC records showing who approved/rejected them and when.
 * Query params: ?page=1&limit=20
 */
router.get("/audit-log", getAuditLog);
 
module.exports = router;
 