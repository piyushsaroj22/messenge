import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signup); // http://localhost:3000/api/auth/signup

authRouter.post("/login", login); // http://localhost:3000/api/auth/login

authRouter.post("/logout", logout); // http://localhost:3000/api/auth/logout

export default authRouter;
