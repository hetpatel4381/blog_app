import express from "express";
import {
  signOut,
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.put("/update/:userId", verifyJWT, updateUser);
userRouter.delete("/delete/:userId", verifyJWT, deleteUser);
userRouter.post("/signout", signOut);

export default userRouter;
