const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();


connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));

app.get('/', (req, res) => {
  res.send('Server is running');
});
 
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.listen(3000, () => console.log("Server running on 3000"));