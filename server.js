const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cron = require('node-cron');
require('./cron/walletCron');
 
 
connectDB();
const app = express();
 
app.use(express.json());
app.use(cors());
 
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
 
app.get('/', (req, res) => {
  res.send('Server is running');
});
 
app.get('/health', (req, res) => {
  res.status(200).send('OK');  
});
 
app.listen(3001, () => console.log("Server running on 3001"));