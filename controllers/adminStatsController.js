const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

// Referral bonus amount must match the value in authController.js
const REFERRAL_BONUS = 50;

// ════════════════════════════════════════════════════════════════════════════
// GET DASHBOARD WIDGET STATS
// GET /api/admin/stats/widgets
// Protected: all admins (auth + adminAuth middleware applied in route)
// Response:
//   {
//     success: true,
//     totalTransactions: <number>,
//     payoInCirculation: <number>,
//     referralRewardsDistributed: <number>
//   }
// ════════════════════════════════════════════════════════════════════════════

const getWidgetStats = async (req, res) => {
  try {
    // ── 1. Total Transactions ─────────────────────────────────────────────────
    // Count every transaction record regardless of status
    const totalTransactions = await Transaction.countDocuments({});

    // ── 2. PAYO in Circulation ────────────────────────────────────────────────
    // Sum the `balance` field across all Wallet documents
    const circulationResult = await Wallet.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$balance" },
        },
      },
    ]);
    const payoInCirculation =
      circulationResult.length > 0 ? circulationResult[0].total : 0;

    // ── 3. Referral Rewards Distributed ──────────────────────────────────────
    // No separate Referral model exists — referral bonuses are credited directly
    // to the referrer's wallet balance in authController.js (REFERRAL_BONUS = 50).
    // Total distributed = number of users who signed up with a referral code * 50.
    const referredUsersCount = await User.countDocuments({
      referredBy: { $exists: true, $ne: null },
    });
    const referralRewardsDistributed = referredUsersCount * REFERRAL_BONUS;

    return res.status(200).json({
      success: true,
      totalTransactions,
      payoInCirculation,
      referralRewardsDistributed,
    });
  } catch (err) {
    console.error("getWidgetStats error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { getWidgetStats };