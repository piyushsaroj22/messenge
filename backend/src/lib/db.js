import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected successfully:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // 1 status code means failure, 0 means success
  }
};

export default connectDB;
