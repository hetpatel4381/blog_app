import dotenv from "dotenv";

dotenv.config();

const _config = {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
};

export const config = Object.freeze(_config);
