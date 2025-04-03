require('dotenv').config();
const app = require("./app");
const cors = require('cors');

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:8080", // Vue dev server
    credentials: true, // Enable cookies/auth headers if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

// Handle preflight requests (important for some browsers)
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
