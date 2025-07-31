require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;
const DBConnection = require("./Database/DB");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

DBConnection();

const allowedOrigins = [
    "https://food-delivery-system-frontend.vercel.app",
    "https://food-delivery-system-admin-silk.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const { Server } = require("socket.io");

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploads - CRITICAL FIX
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Global error handler for multer errors
app.use((error, req, res, next) => {
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            message: 'File too large. Maximum size is 5MB.'
        });
    }
    
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            message: 'Too many files or unexpected field name.'
        });
    }
    
    if (error.message && error.message.includes('file type')) {
        return res.status(400).json({
            message: error.message
        });
    }
    
    // Generic error handler
    console.error('Server Error:', error);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// ROUTES
const authRoute = require("./routes/auth/authRoute");
const productRoute = require("./routes/admin/productRoute");
const adminUsersRoute = require("./routes/admin/adminUsersRoute");
const userReviewRoute = require("./routes/user/userReviewRoute");
const profileRoute = require("./routes/user/profileRoute");
const cartRoute = require("./routes/user/cartRoute");
const orderRoute = require("./routes/user/orderRoute");
const adminOrderRoute = require("./routes/admin/adminOrderRoute");
const paymentRoute = require("./routes/user/paymentRoute");
const getAllDatasRoute = require("./routes/admin/getAllDatas");
const User = require("./model/userModel");

// Route middleware
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/admin", adminUsersRoute);
app.use("/api/admin", adminOrderRoute);
app.use("/api/admin", getAllDatasRoute);
app.use("/api/reviews", userReviewRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/payment", paymentRoute);

app.get("/", (req, res) => {
    res.send("Hello world!");
    console.log("hello world!");
});

const server = app.listen(PORT, (req, res) => {
    console.log(`The server is running on PORT ${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
    }
});

let onlineUsers = [];

const addToOnlineUsers = (socketId, userId, role) => {
    onlineUsers = onlineUsers?.filter((user) => user.userId !== userId);
    onlineUsers.push({ socketId, userId, role });
};

io.on("connection", async (socket) => {
    const { token } = socket.handshake.auth;
    if (token) {
        try {
            const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
            const doesUserExist = await User.findOne({ _id: decoded.id });

            if (doesUserExist) {
                addToOnlineUsers(socket.id, doesUserExist.id, doesUserExist.role);
            }
        } catch (error) {
            console.error("Socket authentication error:", error);
        }
    }

    // Socket orderStatus change/update
    socket.on("updateOrderStatus", ({ status, orderId, userId }) => {
        const findUser = onlineUsers.find((user) => user.userId == userId);
        io.to(findUser?.socketId).emit("statusUpdated", { status, orderId });
    });
});

const getSocketId = () => {
    return io;
};

module.exports.getSocketId = getSocketId;