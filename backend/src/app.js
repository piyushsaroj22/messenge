import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import cors from "cors";

const app = express();

// app.use(express.json({ limit: "5mb" }));
app.use(express.json());
app.use(
  cors({ origin: [config.CLIENT_URL, config.CLIENT_URL_2], credentials: true }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
