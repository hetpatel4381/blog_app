import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return new Error("All Fields are Required !");
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Sign Up Successful", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error while signing up", error });
  }
};