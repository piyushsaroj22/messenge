import { Router } from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup); // http://localhost:3000/api/auth/signup

authRouter.post("/login", login); // http://localhost:3000/api/auth/login

authRouter.post("/logout", logout); // http://localhost:3000/api/auth/logout

authRouter.put("/update-profile", protectRoute, updateProfile); // http://localhost:3000/api/auth/update-profile

export default authRouter;
