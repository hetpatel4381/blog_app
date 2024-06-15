import jwt from "jsonwebtoken";
import ApiError from "./api.error.js";
import asyncHandler from "./asyncHandler.js";
import { config } from "../config/index.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(new ApiError(401, "Unauthorized"));
    }

    jwt.verify(token, config.jwt_key, (err, user) => {
      if (err) {
        return next(new ApiError(401, "Unaurthorized"));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return new ApiError(500, "Internal server error");
  }
});

export default verifyJWT;
