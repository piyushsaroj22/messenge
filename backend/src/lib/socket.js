import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import config from "../config/config.js";
import { Server } from "socket.io";
// import express from "express";
import http from "http";
import app from "../app.js";
import Message from "../models/message.model.js";

// const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { credentials: true, origin: [config.CLIENT_URL, config.CLIENT_URL_2] },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// this is for storig online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.user.fullName} (${socket.userId})`);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // Find all messages that were sent while this user was offline
  const pendingMessages = await Message.find({
    receiverId: userId,
    status: "sent",
  });

  for (const message of pendingMessages) {
    message.status = "delivered";
    await message.save();

    const senderSocketId = getReceiverSocketId(message.senderId.toString());

    if (senderSocketId) {
      io.to(senderSocketId).emit("messageDelivered", {
        clientId: message.clientId,
      });
    }
  }

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", {
        senderId: socket.userId,
      });
    }
  });

  socket.on("stopTyping", ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStoppedTyping", {
        senderId: socket.userId,
      });
    }
  });

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log(
      `User disconnected: ${socket.user.fullName} (${socket.userId})`,
    );
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

// todo :  User browser band kare → typing off
//         User internet disconnect ho → typing off
//         User logout kare → typing off
//         User message bheje → typing off (ye hum pehle hi kar chuke hain) ✅
