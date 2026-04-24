const mongoose = require("mongoose");
 
const walletSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  balance: { type: Number, default: 100 },
 
  walletAddress: String,
  walletExpiry: Date,
 
  qrCode: String,
  qrExpiry: Date,
   qrToken: String
});
 
module.exports = mongoose.model("Wallet", walletSchema);