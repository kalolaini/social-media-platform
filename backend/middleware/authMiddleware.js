const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // ✅ Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Verify token

            req.user = await User.findById(decoded.id).select("-password"); // ✅ Attach user info to req

            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next(); // ✅ Move to the next middleware
        } catch (error) {
            console.error("🔴 Authentication error:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
