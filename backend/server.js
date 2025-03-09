require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB Connected"));

// Import Routes
const dutySlipRoutes = require("./routes/dutySlipRoutes");
const companyRoutes = require("./routes/companyRoutes");
const driverRoutes = require("./routes/driverRoutes");

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

// Serve static files (uploaded images)
app.use("/uploads", express.static(uploadDir));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
