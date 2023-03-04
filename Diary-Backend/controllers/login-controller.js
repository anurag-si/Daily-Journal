import login from "../models/login.js";
import bcrypt from "bcryptjs";
import { createTokens } from "../jwt.js";
import redis from "redis";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await login.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(400).json({ message: "No User Found" });
  } else {
    return res.status(200).json(users);
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await login.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User Already exists!" });
  }

  const hashedPassword = await bcrypt.hashSync(password);

  const newUser = new login({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return console.log(err);
  }

  return res.status(201).json({ newUser });
};

let token;

export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await login.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "No User foound" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "incorrect password" });
  } else {
    // token = jwt.sign({ username: existingUser.username, id: existingUser.id }, "jwtcode");

    const accessToken = createTokens(existingUser);
    console.log(accessToken);
    res.cookie("cookis", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ message: "login successfull" });
  }
};

export const Logout = async (req, res, next) => {
  res.clearCookie("cookis");
  console.log(res.clearCookie("access-token"))
};
