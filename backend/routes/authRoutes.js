const express = require("express");
const User = require("../models/User");
const OTP = require("../models/OTP");
const { authenticate, checkRole } = require("../middlewares/auth");
const { sendEmail } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id || user.username, // Use username for system accounts
        role: user.role,
        username: user.username,
        // isSystemAccount: !!systemAccount,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Prepare user response
    const userResponse = {
      username: user.username,
      email: user.email,
      role: user.role,
      // isSystemAccount: !!systemAccount,
    };

    res.json({
      user: userResponse,
      token,
      expiresIn: 8 * 60 * 60,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Send OTP
// Add this new route to your auth routes file (before module.exports)
// Add this to your auth routes (before module.exports)
router.get("/get-role-email/:role", async (req, res) => {
  const { role } = req.params;

  try {
    // Validate the role
    const validRoles = ["admin", "officer"]; // Note: corrected 'officer' spelling
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid role specified. Valid roles are: " + validRoles.join(", "),
      });
    }

    // Find the first active user with the specified role
    const user = await User.findOne({
      role,
      isActive: true,
    })
      .select("email role")
      .sort({ createdAt: 1 }); // Get the oldest user with this role

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No active ${role} account found`,
      });
    }

    res.json({
      success: true,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error fetching role email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch role email",
      error: error.message,
    });
  }
});

// Also update your existing send-otp endpoint to handle role-specific OTPs
router.post("/send-otp/:role?", async (req, res) => {
  const { email } = req.body;
  const { role } = req.params;

  try {
    let user;
    if (role) {
      // For role-specific OTP (admin/officer password reset)
      user = await User.findOne({ role, email });
    } else {
      // For regular user password reset
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // Rest of your existing OTP logic...
    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 600000), // 10 minutes
    });

    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP code is: ${otp}. It is valid for 10 minutes.`
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP sending error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP (Fixed to trigger modal)
router.post("/verify-otp/:role?", async (req, res) => {
  const { email, otp } = req.body;
  const { role } = req.params;

  try {
    // Find the OTP record
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // For role-specific verification, check if email matches the role
    if (role) {
      const user = await User.findOne({ email, role });
      if (!user) {
        return res.status(403).json({
          message: `This OTP is not valid for ${role} password reset`,
        });
      }
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    res.json({
      success: true,
      message: "OTP verified successfully",
      showChangePasswordModal: true,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

router.post("/change-password/:role?", async (req, res) => {
  const { email, newPassword, confirmPassword, isReset } = req.body;
  const { role } = req.params;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    let user;
    if (isReset) {
      // For password reset flow
      if (role) {
        user = await User.findOne({ email, role });
      } else {
        user = await User.findOne({ email });
      }
    } else {
      // For regular password change
      user = await User.findById(req.user._id);
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Failed to change password" });
  }
});

// Change Password
// router.post("/change-password", async (req, res) => {
//   const { email, newPassword, confirmPassword, isReset } = req.body;

//   try {
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     if (newPassword.length < 8) {
//       return res.status(400).json({
//         message: "Password must be at least 8 characters",
//       });
//     }

//     let user;
//     if (isReset) {
//       // For password reset flow (skip current password check)
//       user = await User.findOne({ email });
//     } else {
//       // For regular password change
//       user = await User.findById(req.user._id);
//       const isMatch = await user.comparePassword(currentPassword);
//       if (!isMatch) {
//         return res
//           .status(401)
//           .json({ message: "Current password is incorrect" });
//       }
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.password = newPassword;
//     await user.save();

//     res.json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.error("Password change error:", error);
//     res.status(500).json({ message: "Failed to change password" });
//   }
// });
// Admin-only route example
router.get(
  "/admin/users",
  authenticate,
  checkRole(["admin", "superadmin"]),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Superadmin-only route example
router.post(
  "/admin/users/:id/deactivate",
  authenticate,
  checkRole(["superadmin"]),
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        success: true,
        message: "User deactivated successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
