import express from "express";
import verifyJWT from "../utils/verifyUser.js";
import { createPost } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/create", verifyJWT, createPost);

export default postRouter;
