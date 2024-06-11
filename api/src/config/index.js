import dotenv from "dotenv";

dotenv.config();

const _config = {
  mongo_uri: process.env.MONGO_URI,
  jwt_key: process.env.JWT_SECRET_KEY,
  port: process.env.PORT || 3000,
};

export const config = Object.freeze(_config);
