const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const WebSocket = require("ws");

dotenv.config();

const connectDB = require("./config/db");
const websocketManager = require("./utils/websocketManager");

// cron
require("./cron/walletCron");

// routes
const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const marketRoutes = require("./routes/marketRoutes");
const updateMarketCache = require("./services/marketUpdater");
// connect database
connectDB();
// Initial fetch
updateMarketCache();

// Refresh every 5 minutes
setInterval(() => {
  updateMarketCache();
}, 5 * 60 * 1000);
const app = express();
const server = http.createServer(app);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/market", marketRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date()
  });
});

// Initialize WebSocket Server
const wss = new WebSocket.Server({ server });
websocketManager.initialize(wss);

// Start Server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("WebSocket server ready for live updates");
});