import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
