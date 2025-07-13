const express = require("express");
const router = express.Router();
const Irigasi = require("../models/Irigasi");

// ✅ POST data dari ESP32
router.post("/log", async (req, res) => {
  try {
    const newLog = new Irigasi(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET semua log (untuk frontend/dashboard/postman)
router.get("/logs", async (req, res) => {
  try {
    const data = await Irigasi.find().sort({ time: -1 }).limit(50);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
