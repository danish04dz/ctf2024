const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Middleware for parsing cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Middleware for parsing JSON
app.use(express.json());

// Database connection
require("./config/database").connect();

// CORS setup
const cors = require("cors");
const allowedOrigins = [
    "https://ctf2024.netlify.app"
];

// CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow credentials (like cookies) to be included
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});
