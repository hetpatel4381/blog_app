import ApiError from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";
import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.model.js";

export const createPost = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(new ApiError(403, "You are not allowed to create a post."));
    }
    if (!req.body.title || !req.body.content) {
      return next(new ApiError(400, "Please provide all required fields"));
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();

    return res
      .status(201)
      .json(new ApiResponse(200, savedPost, "Post Created Successfully!"));
  } catch (error) {
    next(
      new ApiError(500, error, "Internal Server Error while Creating a Post.")
    );
  }
});
