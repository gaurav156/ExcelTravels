const express = require("express");
const { authenticate, checkRole } = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();

// Example: Get all users (only for superadmin)
router.get("/users", authenticate, checkRole("superadmin"), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;