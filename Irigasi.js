const mongoose = require("mongoose");

const irigasiSchema = new mongoose.Schema({
  tanggal: String,
  waktu: String,
  ketinggian_air: Number,
  pompa_isi: String,
  pompa_buang: String,
  metode: String,
  fase: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Irigasi", irigasiSchema);
