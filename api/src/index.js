import express from "express";
import mongoose from "mongoose";
import { config } from "./config/index.js";

mongoose
  .connect(config.mongo_uri)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });

const app = express();

app.listen(config.port, () => {
  console.log(`Server is running on port 3000!!`);
});
