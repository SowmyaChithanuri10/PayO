const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require('./cron/walletCron');
  
connectDB();
const app = express();
 
app.use(express.json());
app.use(cors());
 
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/notifications",require("./routes/notificationRoutes"));
 
app.get('/', (req, res) => {
  res.send('Server is running');
});
 
app.get('/health', (req, res) => {
  res.status(200).send('OK');  
});
 
app.listen(3001, () => console.log("Server running on 3001"));