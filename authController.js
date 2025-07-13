const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Isi semua field!" });
  }

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Username tidak ditemukan." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Password salah." });

  res.status(200).json({
    message: "Login berhasil",
    token: generateToken(user._id),
  });
};

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Isi semua field!" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username sudah ada." });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
  });

  res.status(201).json({
    message: "Registrasi berhasil",
    token: generateToken(user._id),
  });
};

module.exports = { loginUser, registerUser };
