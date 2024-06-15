import ApiError from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = asyncHandler(async (req, res) => {
  res.send({ message: "The API is Working" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(new ApiError(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(new ApiError(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        new ApiError(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(new ApiError(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(new ApiError(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        new ApiError(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res
      .status(200)
      .json(new ApiResponse(201), { user: rest }, "User Updated Successfully!");
  } catch (error) {
    next(error);
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) {
      return new ApiError(403, "You are not allowed to delete this user!");
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(new ApiResponse(200), "User Deleted Successfully!");
  } catch (error) {
    return new ApiError(500, "Internal Server Error");
  }
});
