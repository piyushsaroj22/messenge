import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
