import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup); // http://localhost:3000/api/auth/signup

router.get("/login", login); // http://localhost:3000/api/auth/login

router.get("/logout", logout); // http://localhost:3000/api/auth/logout

export default router;
