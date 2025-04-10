require("dotenv").config();
const app = require("./app");
const cors = require("cors");

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:8080",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like server-to-server, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable cookies/auth headers if needed
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

// Handle preflight requests (important for some browsers)
app.options("*", cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
