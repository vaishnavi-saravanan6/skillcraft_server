import skillCollection from "../Model/model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import todoCollection from "../Model/todoModel.js";

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_WEB, {
    expiresIn: "1d",
  });
};


export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await skillCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new skillCollection({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await skillCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ mess: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ mess: "Invalid password" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), 
    });
  } catch (err) {
    console.error("LOGIN ERROR ", err);
    res.status(500).json({ mess: "Login failed" });
  }
};
