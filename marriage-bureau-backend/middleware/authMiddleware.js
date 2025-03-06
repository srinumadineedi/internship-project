import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const protect = (req, res, next) => {
    console.log("🔑 JWT_SECRET from .env:", process.env.JWT_SECRET); // ✅ Debugging log

    const authHeader = req.header("Authorization");

    console.log("🔹 Incoming Authorization Header:", authHeader); // ✅ Debugging log

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error("❌ No token provided.");
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        console.log("🔹 Received Token Before Verification:", token); // ✅ Debugging log

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token After Verification:", decoded); // ✅ Debugging log

        if (!decoded.user_id) {
            console.error("❌ Invalid token structure.");
            return res.status(401).json({ message: "Invalid token structure." });
        }

        req.user = { userId: decoded.user_id };
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        res.status(401).json({ message: "Invalid or expired token." });
    }
};
