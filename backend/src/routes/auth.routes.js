import { Router } from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetMiddleware } from "../middlewares/arcjet.middleware.js";

const authRouter = Router();

authRouter.use(arcjetMiddleware); // Apply Arcjet middleware to all routes in this router

authRouter.post("/signup", signup); // http://localhost:3000/api/auth/signup

authRouter.post("/login", login); // http://localhost:3000/api/auth/login

authRouter.post("/logout", logout); // http://localhost:3000/api/auth/logout

authRouter.put("/update-profile", protectRoute, updateProfile); // http://localhost:3000/api/auth/update-profile

authRouter.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
); // http://localhost:3000/api/auth/check

export default authRouter;
