require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { authenticate } = require("./middlewares/auth");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connection status: open"));

// Import Routes
const dutySlipRoutes = require("./routes/dutySlipRoutes");
const companyRoutes = require("./routes/companyRoutes");
const driverRoutes = require("./routes/driverRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const driverAuthRoutes = require("./routes/auth");

const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Use Routes
app.use("/api/dutyslips", dutySlipRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/driverauth", driverAuthRoutes);

// Serve static files (uploaded images)
app.use("/uploads", express.static(uploadDir));

module.exports = app;