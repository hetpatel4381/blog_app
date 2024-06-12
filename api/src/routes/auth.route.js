import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.controller.js";

const signupRouter = express.Router();

signupRouter.post("/signup", signup);
signupRouter.post("/signin", signin);
signupRouter.post("/google", googleAuth);

export default signupRouter;
