const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { generateWalletAddress, generateQR } = require("../utils/helpers");
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Recent = require("../models/Recents");
const Bank = require("../models/Bank");
const Notification = require("../models/Notification");

// ================= get wallet =================
 
exports.getWallet = async (req, res) => {  
 
    const wallet = await Wallet.findOne({ userId: req.userId });
 
    res.json(wallet);
 
};
// ================= Send tokens =================
 
 
 
exports.transfer = async (req, res) => {
  try {
    const { amount, toAddress, pin } = req.body;
 
    // 1. Validate input
    if (!amount || !toAddress || !pin) {
      return res.status(400).json({ message: "All fields required" });
    }
 
    const amt = Number(amount);
 
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
 
    // 2. Get logged in user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    // 3. Verify PIN
    const isMatch = await bcrypt.compare(pin, user.transactionPin);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PIN" });
    }
 
    // 4. Get sender wallet
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    if (!senderWallet) {
      return res.status(404).json({ message: "Sender wallet not found" });
    }
 
    // 5. Check balance
    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
 
    // 6. Get receiver wallet using scanned QR address
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }
 
    // 7. Prevent self-transfer
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Cannot transfer to self" });
    }
 
    // 8. Update balances
    senderWallet.balance -= amt;
    receiverWallet.balance += amt;
 
    await senderWallet.save();
    await receiverWallet.save();
 
    // 9. Save transaction
    const txn = new Transaction({
      userId: req.userId,
      senderWallet: senderWallet.walletAddress,
      receiverWallet: receiverWallet.walletAddress,
      amount: amt,
      status: "success",
    });
 
    await txn.save();
 
    // 10. Send response
    return res.json({
      message: "Transfer successful",
      balance: senderWallet.balance,
    });
 
  } catch (err) {
    console.error("TRANSFER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
 
 
// ================= to check balance =================
 
exports.getBalance=async (req, res) => {
 
  const wallet = await Wallet.findOne({ userId: req.userId });
 
  res.json({ balance: wallet.balance });
 
};
 
 
// ================= TRANSACTION HISTORY =================
exports.getTransactions = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
 
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
 
    const txs = await Transaction.find({
      $or: [
        { senderWallet: wallet.walletAddress },
        { receiverWallet: wallet.walletAddress }
      ]
    }).sort({ createdAt: -1 });
 
    const formatted = await Promise.all(
      txs.map(async (t) => {
 
        const isSender = t.senderWallet === wallet.walletAddress;
 
        const otherAddress = isSender
          ? t.receiverWallet
          : t.senderWallet;
 
        const otherWallet = await Wallet.findOne({
          walletAddress: otherAddress
        });
 
        const otherUser = otherWallet
          ? await User.findById(otherWallet.userId)
          : null;
 
        return {
  id: t._id, //  ADD THIS LINE
  name: otherUser?.name || "Unknown",
  amount: isSender ? -t.amount : t.amount,
  status: t.status === "pending" ? "processing" : t.status,
  createdAt: t.createdAt
};
      })
    );
 
    res.json({
      transactions: formatted
    });
 
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 //===============transactions history of particular user==================
 
     
exports.transactionsById = async (req, res) => {
  try {
   const txn = await Transaction.findById(req.params.transaction_id);
 
    if (!txn) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }
 
    // Get receiver user name
    const receiverWallet = await Wallet.findOne({
      walletAddress: txn.receiverWallet
    });
 
    const receiverUser = receiverWallet
      ? await User.findById(receiverWallet.userId)
      : null;
 
    res.json({
      name: receiverUser?.name || "Unknown",
      amount: txn.amount,
      wallet: txn.receiverWallet,
      id: txn.transactionId  
    });
 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};    


exports.transactionCount = async(req, res) => {

  try{
  
    const count = await Transaction.countDocuments({userId: req.userId});


    res.status(200).json({
      count
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
  
};


 // ================= generate qr address =================
 
 
 
 exports.generateAddress = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.userId });
 
    // create wallet if not exists
    if (!wallet) {
     const walletAddress = generateWalletAddress();
 
      wallet = new Wallet({
        userId: req.userId,
        walletAddress,
      });
 
      await wallet.save();
    }
 
    // ensure address exists
    if (!wallet.walletAddress) {
      wallet.walletAddress = generateWalletAddress();
      await wallet.save();
    }
 
    let qrToken = wallet.qrToken;
 
    //  generate new QR if expired
    if (!wallet.qrToken || wallet.qrExpiry <= Date.now()) {
      qrToken = uuidv4();
 
      wallet.qrToken = qrToken;
      wallet.qrExpiry = Date.now() + 15 * 60 * 1000;
 
      await wallet.save();
    }
 
    const qrImage = await QRCode.toDataURL(qrToken);
 
    return res.json({
      qr: qrImage,
      address: wallet.walletAddress,
      expiresIn: Math.floor((wallet.qrExpiry - Date.now()) / 1000),
    });
  } catch (err) {
    console.log("QR ERROR:", err);
    res.status(500).json({ message: "Error generating QR" });
  }
};
 
 
// ================= validating qr image(scanning qrtoken) =================
 
 exports.scan=async (req, res) => {
  try {
    const { qrData } = req.body;
 
    console.log("Scanned QR:", qrData);
 
    if (!qrData) {
      return res.status(400).json({ message: "QR data required" });
    }
 
    const wallet = await Wallet.findOne({ qrToken: qrData });
 
    if (!wallet) {
      return res.status(404).json({ message: "Invalid QR" });
    }
 
    // Expiry check
   if (!wallet.qrExpiry || wallet.qrExpiry <= Date.now()) {
  return res.status(400).json({ message: "QR expired" });
}
 
    //  Prevent self scan
    if (wallet.userId.toString() === req.userId) {
      return res.status(400).json({
        message: "You cannot scan your own QR",
      });
    }
 
    const user = await User.findById(wallet.userId);
 
    res.json({
      name: user.name,
      walletAddress: wallet.walletAddress,
    });
 
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error scanning QR" });
  }
};
 
 
// ================= get user by address =================
 
 exports.getUserByAddress = async (req, res) => {
  try {
    const { address } = req.params;
 
    const wallet = await Wallet.findOne({ walletAddress: address });
 
    if (!wallet) {
      return res.status(404).json({ message: "User not found" });
    }
 
    const user = await User.findById(wallet.userId);
 
    res.json({
      name: user.name,
      walletAddress: wallet.walletAddress
    });
 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
 //==========================preview transfer(screen 1)==========================
exports.previewTransfer = async (req, res) => {
  try {
    const { toAddress, amount } = req.body;
 
    const amt = Number(amount);
 
    if (!toAddress || !amt || amt <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }
 
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
 
    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }
 
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Cannot send to yourself" });
    }
 
    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
 
    const receiverUser = await User.findById(receiverWallet.userId);
    const senderUser = await User.findById(senderWallet.userId);
 
    // RESPONSE MATCHES FRONTEND
    res.json({
      sender: {
        name: senderUser.name,
        wallet: senderWallet.walletAddress   // match frontend
      },
      receiver: {
        name: receiverUser.name
      },
      address: receiverWallet.walletAddress, // required
      amount: amt
    });
 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
 
//=========================confirm and transfer (Screen 2)======================
 
exports.confirmTransfer = async (req, res) => {
  try {
    const { toAddress, amount, pin } = req.body;
 
    const amt = Number(amount);
 
    if (!toAddress || !amt || !pin) {
      return res.status(400).json({ message: "All fields required" });
    }
 
    const user = await User.findById(req.userId);
 
    // PIN CHECK
    const isMatch = await bcrypt.compare(pin, user.transactionPin);
 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid PIN" });
    }
 
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
 
    if (!receiverWallet) {
      return res.status(404).json({ message: "Receiver not found" });
    }
 
    if (senderWallet.walletAddress === receiverWallet.walletAddress) {
      return res.status(400).json({ message: "Self transfer not allowed" });
    }
 
    if (senderWallet.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
 
    //  TRANSFER
    senderWallet.balance -= amt;
    receiverWallet.balance += amt;
 
    await senderWallet.save();
    await receiverWallet.save();
 
    //  TRANSACTION
    await Transaction.create({
      from: senderWallet.walletAddress,
      to: receiverWallet.walletAddress,
      amount: amt,
      type: "TRANSFER",
      status: "SUCCESS",
      date: new Date()
    });
 
    res.json({
      message: "Transfer successful",
      balance: senderWallet.balance
    });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 
// ================= REFER & EARN =================
 
exports.getReferData = async (req, res) => {
  try {
    const rewardPerUser = 50;
 
    // 1. Get current user
    const user = await User.findById(req.userId);
 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    // 2. Get all referred users
    const referredUsers = await User.find({
      referredBy: user.myReferralCode
    });
 
    let successfulReferrals = 0;
 
    // 3. Check each user first transaction
    for (let refUser of referredUsers) {
      const wallet = await Wallet.findOne({ userId: refUser._id });
 
      if (!wallet) continue;
 
      const txn = await Transaction.findOne({
        senderWallet: wallet.walletAddress,
        status: "success"
      });
 
      if (txn) {
        successfulReferrals++;
      }
    }
 
    // 4. Response
    res.json({
      referralCode: user.myReferralCode,
      totalUsers: referredUsers.length,
      successfulReferrals,
      totalRewards: successfulReferrals * rewardPerUser,
      rewardPerUser
    });
 
  } catch (err) {
    console.error("REFERRAL ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
//==============================save to recents(toggle button code)=========================
 
 
exports.saveRecent = async (req, res) => {
  try {
    const { receiverName, walletAddress } = req.body;
 
    //  check duplicate (optional but good)
    const existing = await Recent.findOne({
      userId: req.userId,
      walletAddress,
    });
 
    if (existing) {
      return res.status(200).json({ message: "Already saved" });
    }
 
    const recent = new Recent({
      userId: req.userId,
      receiverName,
      walletAddress,
    });
 
    await recent.save();
 
    res.status(201).json({ message: "Saved to recents" });
 
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
 
//=================== recents page================
 
exports.getRecents = async (req, res) => {
  try {
    const recents = await Recent.find({ userId: req.userId })
      .sort({ createdAt: -1 }) // latest first
      .limit(20); // optional limit
 
    res.json(recents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recents" });
  }
};
//==============================get wallet dashboard=========================
 
exports.walletDashboard=async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
 
    const user = await User.findById(req.userId);
 
    // REFERRALS (optimized)
    const referredUsers = await User.find({
      referredBy: user.myReferralCode
    });
 
    const referredUserIds = referredUsers.map(u => u._id);
 
    const wallets = await Wallet.find({ userId: { $in: referredUserIds } });
 
    const walletAddresses = wallets.map(w => w.walletAddress);
 
    const successfulTxns = await Transaction.find({
      senderWallet: { $in: walletAddresses },
      status: "success"
    });
 
    const uniqueSenders = new Set(
      successfulTxns.map(t => t.senderWallet)
    );
 
    const successfulReferrals = uniqueSenders.size;
 
    const rewardPerUser = 50;
    const totalReferralRewards = successfulReferrals * rewardPerUser;
 
    // LOCK LOGIC
    const accountAge =
      Date.now() - new Date(user.createdAt).getTime();
 
    const daysSinceSignup =
      accountAge / (1000 * 60 * 60 * 24);
 
    const isLocked = daysSinceSignup < 3;
    const daysUntilUnlock = isLocked
      ? Math.ceil(3 - daysSinceSignup)
      : 0;
 
    // DAILY LIMIT
    const today = new Date();
    today.setHours(0, 0, 0, 0);
 
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
 
    const todayTransactions = await Transaction.find({
      userId: req.userId,
      createdAt: { $gte: today, $lt: tomorrow },
      status: "success"
    });
 
    const totalSentToday = todayTransactions.reduce(
      (sum, txn) => sum + txn.amount,
    );
 
    const dailyLimit = 10000;
 
    // FINAL RESPONSE (frontend compatible)
    res.json({
      id: wallet.walletAddress,
      balance: wallet.balance,  
 
      referralRewards: totalReferralRewards,
      referralStatus: isLocked ? "Locked" : "Unlocked",
      unlockInDays: daysUntilUnlock,
 
      dailyUsed: totalSentToday,
      dailyLimit: dailyLimit
    });
 
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
   
 //=============================bank details ==============================


//  Add Bank Account
exports.addBank = async (req, res) => {
  try {
    const {
      name,
      mobile,
      bank,
      account,
      confirmAccount,
      ifsc,
      accountType
    } = req.body;

    //  Validations
    if (
      !name ||
      !mobile ||
      !bank ||
      !account ||
      !confirmAccount ||
      !ifsc ||
      !accountType
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Account number match
    if (account !== confirmAccount) {
      return res.status(400).json({
        message: "Account numbers do not match"
      });
    }

    //  Mobile validation
    if (!/^[1-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number"
      });
    }

    //  IFSC validation
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(ifsc)) {
      return res.status(400).json({
        message: "Invalid IFSC code"
      });
    }
if (account.length < 9 || account.length > 18) {
  return res.status(400).json({
    message: "Account number must be between 9 and 18 digits"
  });
}
    //  Save to DB
    const bankDetails = await Bank.create({
      userId: req.userId, // from auth middleware
      accountHolderName: name,
      mobileNumber: mobile,
      bankName: bank,
      accountNumber: account,
      ifscCode: ifsc,
      accountType: accountType
    });

    // Response
    res.status(201).json({
      message: "Bank details added successfully",
      data: bankDetails
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// ================= CREATE =================
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;

    const notification = await Notification.create({
      userId: req.userId,
      title,
      message,
      type
    });

    res.json({
      message: "Notification created",
      notification
    });

  } catch (err) {
    console.log("Notification error:", err);
    res.status(500).json({ message: "Error creating notification" });
  }
};


// ================= GET ALL =================
exports.getAllNotifications = async (req, res) => {
  try {
    const data = await Notification.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};


// ================= MARK ONE =================
exports.markOneAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true
    });

    res.json({ message: "Marked as read" });

  } catch (err) {
    res.status(500).json({ message: "Error updating" });
  }
};


// ================= MARK ALL =================
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { userId: req.userId, isRead: false },
      { isRead: true }
    );

    res.json({ message: "All marked as read" });

  } catch (err) {
    res.status(500).json({ message: "Error updating" });
  }
};


// ================= UNREAD COUNT =================
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.userId,
      isRead: false
    });

    res.json({ count });

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};