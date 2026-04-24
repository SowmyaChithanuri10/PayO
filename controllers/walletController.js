const Wallet = require("../models/Wallet");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { generateWalletAddress, generateQR } = require("../utils/helpers");
const bcrypt = require("bcrypt");
const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Recent = require("../models/Recents");
// ================= get wallet =================
 
exports.getWallet = async (req, res) => {  
 
    const wallet = await Wallet.findOne({ userId: req.userId });
 
    res.json(wallet);
 
};
// ================= Send tokens =================
// exports.transfer=async (req, res) => {
//   try {
//     const { amount, toAddress, pin } = req.body;
 
//     if (!amount || !toAddress || !pin) {
//       return res.status(400).json({ message: "All fields required" });
//     }
 
//     // Get sender user
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });
 
//     // Verify PIN
//     const isMatch = await bcrypt.compare(pin, user.transactionPin);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid PIN" });
//     }
 
//     // Get sender wallet
//     const senderWallet = await Wallet.findOne({ userId: req.userId });
//     if (!senderWallet) {
//       return res.status(404).json({ message: "Sender wallet not found" });
//     }
 
//     // Check balance
//    const amt = Number(amount);
 
// if (isNaN(amt) || amt <= 0) {
//   return res.status(400).json({ message: "Invalid amount" });
// }
 
// if (senderWallet.balance < amt) {
//   return res.status(400).json({ message: "Insufficient balance" });
// }
 
//     // Get receiver wallet
//    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
//     if (!receiverWallet) {
//       return res.status(404).json({ message: "Receiver not found" });
//     }
 
//     // Prevent self transfer
//     if (senderWallet.walletAddress === receiverWallet.walletAddress){
//       return res.status(400).json({ message: "Cannot transfer to self" });
//     }
 
//     //  Update balances
//   senderWallet.balance -= amt;
// receiverWallet.balance += amt;
 
//     await senderWallet.save();
//     await receiverWallet.save();
 
//     // Save transaction
//     const txn = new Transaction({
//       from: senderWallet.walletAddress,
//       to: receiverWallet.walletAddress,
//       amount,
//       status: "SUCCESS",
//       date: new Date(),
//     });
 
//     await txn.save();
 
//     // Response
//     res.json({
//       message: "Transfer successful",
//       balance: senderWallet.balance,
//     });
 
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
 
 
 
// exports.transfer = async (req, res) => {
//   let txn; // declare outside so we can update in catch
 
//   try {
//     const { amount, toAddress, pin } = req.body;
 
//     // 1. Validate input
//     if (!amount || !toAddress || !pin) {
//       return res.status(400).json({ message: "All fields required" });
//     }
 
//     const amt = Number(amount);
 
//     if (isNaN(amt) || amt <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }
 
//     // 2. Get user
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
 
//     // 3. Get sender wallet early (needed for txn record)
//     const senderWallet = await Wallet.findOne({ userId: req.userId });
 
// if (!senderWallet) {
//   return res.status(404).json({ message: "Sender wallet not found" });
// }
 
// // create txn AFTER validation
// txn = new Transaction({
//   senderWallet: senderWallet.walletAddress,
//   receiverWallet: toAddress,
//   amount: amt,
//   status: "pending",
// });
 
// await txn.save();
 
 
 
//     if (!senderWallet) {
//       txn.status = "failed";
//       await txn.save();
//       return res.status(404).json({ message: "Sender wallet not found" });
//     }
 
//     // 5. Verify PIN
// const senderWallet = await Wallet.findOne({ userId: req.userId });
 
// if (!senderWallet) {
//   return res.status(404).json({ message: "Sender wallet not found" });
// }
 
// // create txn AFTER validation
// txn = new Transaction({
//   senderWallet: senderWallet.walletAddress,
//   receiverWallet: toAddress,
//   amount: amt,
//   status: "pending",
// });
 
// await txn.save();
//     if (!isMatch) {
//       txn.status = "failed";
//       await txn.save();
//       return res.status(401).json({ message: "Invalid PIN" });
//     }
 
//     // 6. Check balance
//     if (senderWallet.balance < amt) {
//       txn.status = "failed";
//       await txn.save();
//       return res.status(400).json({ message: "Insufficient balance" });
//     }
 
//     // 7. Get receiver wallet
//     const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
//     if (!receiverWallet) {
//       txn.status = "failed";
//       await txn.save();
//       return res.status(404).json({ message: "Receiver not found" });
//     }
 
//     // 8. Prevent self-transfer
//     if (senderWallet.walletAddress === receiverWallet.walletAddress) {
//       txn.status = "failed";
//       await txn.save();
//       return res.status(400).json({ message: "Cannot transfer to self" });
//     }
 
//     // 9. Update balances
//     senderWallet.balance -= amt;
//     receiverWallet.balance += amt;
 
//     await senderWallet.save();
//     await receiverWallet.save();
 
//     // 10. Mark success transaction
//     txn.status = "success";
//     await txn.save();
 
//     // 11. Response
//     return res.json({
//       message: "Transfer successful",
//       balance: senderWallet.balance,
//     });
 
//   } catch (err) {
//     console.error("TRANSFER ERROR:", err);
 
//     // mark failed transaction if exists
//     if (txn) {
//       txn.status = "failed";
//       await txn.save();
//     }
 
//     return res.status(500).json({ message: "Server error" });
//   }
// };
 
// exports.transfer=async (req, res) => {
//   try {
//     const { amount, toAddress, pin } = req.body;
 
//     if (!amount || !toAddress || !pin) {
//       return res.status(400).json({ message: "All fields required" });
//     }
 
//     // Get sender user
//     const user = await User.findById(req.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });
 
//     // Verify PIN
//     const isMatch = await bcrypt.compare(pin, user.transactionPin);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid PIN" });
//     }
 
//     // Get sender wallet
//     const senderWallet = await Wallet.findOne({ userId: req.userId });
//     if (!senderWallet) {
//       return res.status(404).json({ message: "Sender wallet not found" });
//     }
 
//     // Check balance
//    const amt = Number(amount);
 
// if (isNaN(amt) || amt <= 0) {
//   return res.status(400).json({ message: "Invalid amount" });
// }
 
// if (senderWallet.balance < amt) {
//   return res.status(400).json({ message: "Insufficient balance" });
// }
 
//     // Get receiver wallet
//    const receiverWallet = await Wallet.findOne({ walletAddress: toAddress });
//     if (!receiverWallet) {
//       return res.status(404).json({ message: "Receiver not found" });
//     }
 
//     // Prevent self transfer
//     if (senderWallet.walletAddress === receiverWallet.walletAddress){
//       return res.status(400).json({ message: "Cannot transfer to self" });
//     }
 
//     //  Update balances
//   senderWallet.balance -= amt;
//   receiverWallet.balance += amt;
 
//     await senderWallet.save();
//     await receiverWallet.save();
 
//     // Save transaction
//     const txn = new Transaction({
//       from: senderWallet.walletAddress,
//       to: receiverWallet.walletAddress,
//       amount,
//       status: "SUCCESS",
//       date: new Date(),
//     });
 
//     await txn.save();
 
//     // Response
//     res.json({
//       message: "Transfer successful",
//       balance: senderWallet.balance,
//     });
 
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
 
 
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
 
// ================= SCAN QR =================
 
// exports.scanQr = async (req, res) => {
//   try {
//     const { qrData } = req.body;
 
//     // 1. Check input
//     if (!qrData) {
//       return res.status(400).json({ message: "QR data required" });
//     }
 
//     let walletAddress;
 
//     // 2. Support BOTH formats (important for compatibility)
//     try {
//       // If QR contains JSON
//       const parsed = JSON.parse(qrData);
//       walletAddress = parsed.walletAddress;
//     } catch {
//       // If QR is plain string (old format)
//       walletAddress = qrData;
//     }
 
//     // 3. Find wallet
//     const wallet = await Wallet.findOne({ walletAddress });
 
//     if (!wallet) {
//       return res.status(400).json({ message: "Invalid QR" });
//     }
 
//     // 4. Check QR expiry
//     if (wallet.qrExpiry && wallet.qrExpiry < Date.now()) {
//       return res.status(400).json({ message: "QR expired" });
//     }
 
//     // 5. Get user details
//     const user = await User.findById(wallet.userId);
 
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
 
//     // 6. Response
//     return res.json({
//       name: user.name,
//       walletAddress: wallet.walletAddress
//     });
 
//   } catch (err) {
//     console.error("scanQr error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
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
    const transaction = await Transaction.findOne({
      transactionId: req.params.transaction_id
    });
 
    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found"
      });
    }
 
    res.json({
      status: "success",
      transaction
    });
 
  } catch (err) {
    console.error(err); //  ADD THIS FOR DEBUG
    res.status(500).json({
      status: "error",
      message: "Failed to get transaction"
    });
  }
};      
 
 // ================= generate qr address =================
 
 
 
// exports.generateAddress = async (req, res) => {
//   try {
//     let wallet = await Wallet.findOne({ userId: req.userId });
 
//     // CREATE WALLET
//     if (!wallet) {
//       wallet = new Wallet({
//         userId: req.userId,
//         walletAddress: generateWalletAddress(),
//         addressExpiry: Date.now() + 60 * 60 * 1000
//       });
 
//       await wallet.save();
//     }
 
//     // WALLET EXPIRY (60 min)
//     if (!wallet.addressExpiry || wallet.addressExpiry <= Date.now()) {
//       wallet.walletAddress = generateWalletAddress();
//       wallet.addressExpiry = Date.now() + 60 * 60 * 1000;
//     }
 
//     // QR EXPIRY (15 min)
//     if (!wallet.qrToken || wallet.qrExpiry <= Date.now()) {
//       wallet.qrToken = uuidv4();
//       wallet.qrExpiry = Date.now() + 15 * 60 * 1000;
//     }
 
//     await wallet.save();
 
//     const qrImage = await QRCode.toDataURL(wallet.qrToken);
 
//     return res.json({
//       qr: qrImage,
//       address: wallet.walletAddress,
//       expiresIn: Math.floor((wallet.qrExpiry - Date.now()) / 1000),
//     });
 
//   } catch (err) {
//     console.log("QR ERROR:", err);
//     res.status(500).json({ message: "Error generating QR" });
//   }
// };
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
 