import userModel from "../Models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });

  const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(200).send({
      success: false,
      message: "Invalid password!",
    });
  }

  const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

export const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModel
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });
  res.send(users);
};
