// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// Import routes
const authRoutes = require("./routes/authRoutes");
const irrigationRoutes = require("./routes/irrigationRoutes");

const scheduleRoutes = require("./routes/scheduleRoutes");
const espRoutes = require("./routes/espRoutes"); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // ✅ CORS diaktifkan
app.use(express.json()); // Untuk membaca body JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/irigasi", irrigationRoutes);
app.use("/api/jadwal", scheduleRoutes);
app.use("/api/esp", espRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`✅ Server jalan di port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Gagal konek MongoDB:", err);
  });
