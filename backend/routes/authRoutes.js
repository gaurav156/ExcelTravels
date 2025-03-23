const express = require("express");
const User = require("../models/User");
const OTP = require("../models/OTP"); // Create an OTP model if needed
const { authenticate, checkRole } = require("../middlewares/auth");
const { sendEmail } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the input password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return user and token
    res.json({ user, token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    await OTP.create({ email, otp, expiresAt: Date.now() + 600000 }); // Expires in 10 minutes

    // Send OTP via email
    await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Delete the OTP after verification
    await OTP.deleteOne({ email, otp });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

// Change Password
router.post("/change-password", authenticate, async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
});

module.exports = router;