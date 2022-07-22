import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/auth";
import User from "../models/user";

// register end here
export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  // console.log("Requested Post Data =>: " req.body);
  // 422 is unprocessable Entity
  // Validation Starts
  if (!name) return res.status(422).send("Name is required!");
  if (!email) return res.status(404).send("Email is required!");
  if (!password || password < 6)
    return res
      .status(404)
      .send("Password is required & should be 6 character long!");
  if (!secret) return res.status(404).send("Secret is required!");
  const exist = await User.findOne({ email });
  if (exist) return res.status(422).send("email already exist");

  // Validation ends & start working on User model
  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword, secret });
  try {
    await user.save();
    // console.log(user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log(`Register failed ${err}`);
    return res.status(400).send(`Error. Try again!`);
  }
};
// register end here
// Login start here
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(404).send("Email is required!");
    if (!password || password.length < 6) {
      return res
        .status(404)
        .send("Password is required & should be 6 character long!");
    }
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send("You are not registerd yet! Please Register");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).send("wrong password");
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    return res.json({ token, user });
    // return res.status(401).send("Password not Matched!");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Errr. Try Again!");
  }
};
// Login end here

// Forgot password start here
export const forgotPassword = async (req, res) => {
  const { email, newPassword, secret } = req.body;
  // console.log(req.body);
  if (!email) {
    return res.status(404).json("Email is required");
  }
  if (!newPassword || newPassword.length <= 6) {
    return res.status(404).json("Password is required");
  }
  if (!secret) {
    return res.status(404).json("Secret is required");
  }
  const user = await User.findOne({ email, secret });
  if (!user) {
    return res.status(400).json("User is not exist!");
  }
  try {
    const hashedPassword = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.status(200).json({
      ok:true,
      success: "Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Could not reset the password");
  }
};
// Forgot password end here

// Checking current user start here
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user)
      return res.json({
        ok: true,
      });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
// Checking current user end here
