process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "*"
}));
// Middleware

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:");
    console.log(err.message);
  });

// Routes
app.use("/api/leads", require("./routes/leadRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: err.message,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});