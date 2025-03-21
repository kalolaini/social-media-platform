const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.path}`);
    next();
});

// Define API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));  
app.use("/api/likes", require("./routes/likeRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

if (require.main === module) {
    connectDB();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;

