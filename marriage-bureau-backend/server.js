import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import pool from "./config/db.js";

// Import API Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";  // ✅ Ensure this route is properly registered
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors({ 
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
}));
app.use(express.json());  // ✅ Ensure JSON body parsing
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Serve uploaded images as static files
app.use("/uploads", express.static(uploadDir));

// ✅ Register API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/messages", messageRoutes); // ✅ Message routes are correctly set up
app.use("/api/admin", adminRoutes);

// ✅ Check Database Connection
pool.connect()
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => {
        console.error("❌ Database connection error:", err);
        process.exit(1); // Exit process if DB fails
    });

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
