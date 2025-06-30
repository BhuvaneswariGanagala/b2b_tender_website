// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDb = require("./utils/db");
const ChatMessage = require("./models/ChatMessage");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const postRoutes = require("./router/postRoutes");
const chatRoutes = require("./router/chatRoutes");
const errorMiddleware = require("./mildlewares/err-middleware");

const app = express();
const server = http.createServer(app);

// ✅ Allow frontend URL from .env for CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}));

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Error handling middleware
app.use(errorMiddleware);

// ✅ Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 New socket connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on("chatMessage", async ({ room, sender, message }) => {
    const newMessage = new ChatMessage({ room, sender, message });
    await newMessage.save();
    io.to(room).emit("chatMessage", newMessage);
  });

  socket.on("clearChat", async (room) => {
    await ChatMessage.deleteMany({ room });
    io.to(room).emit("chatCleared");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// ✅ Connect to database and start server
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server is running on ${process.env.BACKEND_URL || "http://localhost:" + PORT}`);
  });
});
