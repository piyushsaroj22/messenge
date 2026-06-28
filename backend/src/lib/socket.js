import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import config from "../config/config.js";
import { Server } from "socket.io";
// import express from "express";
import http from "http";
import app from "../app.js";

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

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.fullName} (${socket.userId})`);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

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
