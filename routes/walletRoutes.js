const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const auth = require("../middleware/auth");
 
 
router.post("/transfer", auth, walletController.transfer);
router.get("/balance",auth,walletController.getBalance);
router.get("/getwallet", auth, walletController.getWallet);
router.get("/generate-address",auth,walletController.generateAddress);
router.post("/scan-qr",auth,walletController.scan);
router.get("/user/:address", auth, walletController.getUserByAddress);
router.post("/transfer/preview", auth, walletController.previewTransfer);
router.post("/transfer/confirm", auth, walletController.confirmTransfer);
router.get("/transaction-list",auth,walletController.getTransactions);
router.get("/refer", auth, walletController.getReferData);
router.get("/transactionById/:transaction_id",auth,walletController.transactionsById);
router.post("/recent-toggle-add", auth, walletController.saveRecent);
router.get("/recents-page",auth,walletController.getRecents);
router.get("/getwalletdashboard",auth,walletController.walletDashboard);
router.post("/add-bank", auth, walletController.addBank);
router.get("/get-transaction-count", auth, walletController.transactionCount);
router.get("/income-outcome", auth, walletController.getIncomeOutcome);
router.get("/profile",auth,walletController.profile);
router.get("/notifications", auth, walletController.getAllNotifications);
router.put("/notifications/:id/read", auth, walletController.markOneAsRead);
router.put("/notifications/read-all", auth, walletController.markAllAsRead);
router.get("/notifications/unread-count", auth, walletController.getUnreadCount);
router.get("/transactions/user/:walletAddress", auth, walletController.getTransactionsWithUser);

module.exports = router;
 