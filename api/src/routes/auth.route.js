import express from "express";
import { signup } from "../controllers/auth.controller.js";

const signupRouter = express.Router();

signupRouter.post("/signup", signup);

export default signupRouter;
