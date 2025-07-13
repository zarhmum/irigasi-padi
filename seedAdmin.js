const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ username: "admin" });
    if (existing) {
      console.log("⚠️ User admin sudah ada.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({ username: "admin", password: hashedPassword });

    console.log("✅ User admin berhasil ditambahkan.");
    process.exit();
  } catch (error) {
    console.error("❌ Gagal menambahkan admin:", error);
    process.exit(1);
  }
}

seedAdmin();
