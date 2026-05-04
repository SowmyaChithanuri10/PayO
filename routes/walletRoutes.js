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
router.post("/create", auth, walletController.createNotification);
router.get("/get-all", auth, walletController.getAllNotifications);
router.put("/mark-read/:id", auth, walletController.markOneAsRead);
router.put("/mark-all-read", auth, walletController.markAllAsRead);
router.get("/get-unread-count", auth, walletController.getUnreadCount);
router.get("/get-transaction-count", auth, walletController.transactionCount);

module.exports = router;
 