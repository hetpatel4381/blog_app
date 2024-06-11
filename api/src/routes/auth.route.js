import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const signupRouter = express.Router();

signupRouter.post("/signup", signup);
signupRouter.post("/signin", signin);

export default signupRouter;
