import dotenv from "dotenv";
dotenv.config();
import express, { Router } from "express";
import mongoose from "mongoose";
import ServerlessHttp from "serverless-http";
import cors from "cors";
import dutySlipRoutes from "../../routes/dutySlipRoutes";
import companyRoutes from "../../routes/companyRoutes";
import driverRoutes from "../../routes/driverRoutes";
import authRoutes from "../../routes/authRoutes";
import userRoutes from "../../routes/userRoutes";
import driverAuthRoutes from "../../routes/auth";
// import { authenticate } from "../../middlewares/auth";
// import path from "path";
// import fs from "fs";

const router = Router();

const app = express();

// Read and split the allowed origins from .env
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:8080",
  "http://localhost:8081",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like server-to-server, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
db.once("open", () => console.log("MongoDB connection status: open"));

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// Use Routes
app.use("/api/dutyslips", dutySlipRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/driverauth", driverAuthRoutes);

// Serve static files (uploaded images)
// app.use("/uploads", express.static(uploadDir));

// module.exports = app;

// const cors = require('cors');

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Excel Tours & Travle's Backend!",
  });
});
app.use("/api/", router);
export const handler = ServerlessHttp(app);
