import express from "express";
import mongoose from "mongoose";
import { config } from "./config/index.js";
import userRoutes from "./routes/user.route.js";
import signupRoutes from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

mongoose
  .connect(config.mongo_uri)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", signupRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port 3000!!`);
});
