const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const {connectBinance,getLatestPrices} = require("./services/binanceService");
const connectDB = require("./config/db");
require('./cron/walletCron');
  
connectDB();
const app = express();
const server = http.createServer(app);
 
app.use(express.json());
app.use(cors());

const io = socketIo(server, {
  cors: { origin: "*" }
});
 
// start websocket
connectBinance();

// SOCKET REALTIME PUSH
io.on("connection", (socket) => {
  console.log("Client connected");
 
  const interval = setInterval(() => {
    socket.emit("prices", getLatestPrices());
  }, 1000);
 
  socket.on("disconnect", () => {
    clearInterval(interval);
  });
});
 
 
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/notifications",require("./routes/notificationRoutes"));
app.use("/api/marketinfo",require("./routes/marketRoutes"));
 
app.get('/', (req, res) => {
  res.send('Server is running');
});
 
app.get('/health', (req, res) => {
  res.status(200).send('OK');  
});

app.get("/", (req, res) => {
  res.send(" Binance Live Server Running");
});
 
app.listen(3001, () => console.log("Server running on 3001"));
