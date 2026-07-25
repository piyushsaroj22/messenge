import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return token;
};
