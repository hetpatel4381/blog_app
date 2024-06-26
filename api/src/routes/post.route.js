import express from "express";
import verifyJWT from "../utils/verifyUser.js";
import { createPost, getPosts } from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.post("/create", verifyJWT, createPost);
postRouter.get("/getposts", getPosts);

export default postRouter;
