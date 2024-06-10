import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";

export const signup = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All Fields are Required");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User Already Exists!");
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username: username.toLowerCase(),
      email,
      password: hashPassword,
    });

    const userCreated = await User.findById(newUser._id).select("-password");

    if (!userCreated) {
      throw new ApiError(
        500,
        "Something went wrong while Registering the User!"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, userCreated, "User Created Successfully!"));
  } catch (error) {
    throw new ApiError(400, "Error Encountered registering New User !");
  }
});
