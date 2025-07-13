const Log = require("../models/Irrigation");

exports.logIrrigation = async (req, res) => {
  try {
    const { waterLevel, pumpStatus, method, phase } = req.body;
    const log = await Log.create({ waterLevel, pumpStatus, method, phase });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: "Gagal menyimpan log" });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ time: -1 }).limit(10);
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Gagal ambil log" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const total = await Log.countDocuments();
    const sri = await Log.countDocuments({ method: "SRI" });
    const pbk = await Log.countDocuments({ method: "PBK" });
    res.json({ total, sri, pbk });
  } catch {
    res.status(500).json({ error: "Gagal ambil ringkasan" });
  }
};

exports.getLogsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Tanggal diperlukan" });

    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const logs = await Log.find({ time: { $gte: start, $lt: end } }).sort({ time: -1 });
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Gagal ambil data tanggal" });
  }
};
