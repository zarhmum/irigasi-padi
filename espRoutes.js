const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData"); // ✅ import model

// 📡 Endpoint untuk menerima data dari ESP32
router.post("/data", async (req, res) => {
  try {
    const { tinggi_air, status_pompa, metode, waktu } = req.body;

    // Buat dan simpan ke MongoDB
    const newData = new SensorData({
      tinggi_air,
      status_pompa,
      metode,
      waktu: waktu || new Date() // fallback waktu sekarang
    });

    await newData.save();

    console.log("✅ Data dari ESP32 disimpan:", newData);
    res.status(200).json({ message: "✅ Data berhasil disimpan", data: newData });
  } catch (err) {
    console.error("❌ Error simpan data ESP32:", err.message);
    res.status(500).json({ message: "❌ Gagal simpan data", error: err.message });
  }
});

module.exports = router;