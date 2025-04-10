const express = require("express");
const { authenticate, checkRole } = require("../middlewares/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// Example: Get all users (only for superadmin)
router.get(
  "/users",
  authenticate,
  checkRole("superadmin"),
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get current user's data (protected route)
router.get("/me", authenticate, async (req, res) => {
  try {
    // The user ID is attached to the request by the `authenticate` middleware
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected route (requires valid JWT)
router.get("/protected-data", async (req, res) => {
  // Check for JWT first
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ message: "Protected data (JWT)", user: decoded });
    } catch (error) {
      // JWT invalid: fall through to Basic Auth
    }
  }

  // Fallback to Basic Auth
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Visible Realm"');
    return res.status(401).send("Authentication required");
  }

  // Extract username:password from Basic Auth
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  // Validate credentials
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.setHeader("WWW-Authenticate", 'Basic realm="User Visible Realm"');
    return res.status(401).send("Invalid credentials");
  }

  // If valid, return data (or issue a JWT)
  res.json({ message: "Protected data (Basic Auth)", user: { id: user._id } });
});

module.exports = router;