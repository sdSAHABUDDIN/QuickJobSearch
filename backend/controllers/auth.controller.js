import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => { 
  const { name, email, password,username } = req.body;
  // Validate the input data  
  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  // Check if the user already exists 
  const existingUser = await User.find({username});
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }  
  
  //check if the email is already registered
  const existingEmail = await User.find({email});
  if (existingEmail) {
    return res.status(400).json({ message: "Email already registered!" });
  }
  //password length validation
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long!" });
  }
  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    username,
  });
  try {
    const user=await newUser.save();
    res.status(201).json({message:"User created successfully",user});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(201).json({message:"User created successfully",user,token});
    res.cookie("access_token",token,
      {httpOnly:true,//prevents client side js from accessing the cookie
      secure:process.env.NODE_ENV==="production",//only send cookie over https in production
      sameSite:"strict",//prevents CSRF attacks
      maxAge: 24*60*60*1000, // 1 day
    }).status(201).json({message:"User created successfully",user,token});
  } catch (error) {
    res.status(500).json({message:"Internal server error"});
  }
}
export const login = async (req, res) => {  
  res.status(200).json({ message: "User logged in successfully!" });
}
export const logout = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully!" });
}
