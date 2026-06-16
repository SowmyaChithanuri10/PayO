const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

const { getWidgetStats } = require("../controllers/adminStatsController");

// ── ALL ROUTES BELOW REQUIRE: valid JWT (auth) + admin role (adminAuth) ──────
router.use(auth, adminAuth);

// ── ALL ADMINS ────────────────────────────────────────────────────────────────
// Dashboard widget stats — readable by every admin role
// GET /api/admin/stats/widgets
router.get("/widgets", getWidgetStats);

module.exports = router;