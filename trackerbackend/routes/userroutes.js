const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || process.env.secret_key || "myprojectsecret";

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
};

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    jwtSecret,
    { expiresIn: "1d" }
  );
};

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullname, email, password: hashedPassword });
    await user.save();
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = createToken(user);
    const { password: _, ...userData } = user.toObject();

    res.cookie("token", token, cookieOptions);

    res.status(200).json({ user: userData, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;




