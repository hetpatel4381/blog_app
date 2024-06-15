import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import verifyJWT from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.put("/update/:userId", verifyJWT, updateUser);

export default userRouter;
