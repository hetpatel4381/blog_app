import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/api.error.js";
import { ApiResponse } from "../utils/api.response.js";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

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

export const signin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      throw new ApiError(400, "All Fields are Required to LogIn");
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      throw new ApiError(400, "Invalid Credentials");
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      throw new ApiError(400, "Invalid Credentials!");
    }

    const token = jwt.sign({ id: validUser._id }, config.jwt_key);

    const loggedInUser = await User.findById(validUser._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser },
          "User Logged In Successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(400, "Error Encounter while login in User!");
  }
});
