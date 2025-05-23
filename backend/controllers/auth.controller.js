import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../Email/EmailHandler.js"; // Adjust the import path as necessary
export const signup = async (req, res) => {
  console.log("Received body:", req.body);
  console.log("Raw keys:", Object.keys(req.body));

  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log(name, email, password, username);

  try {
    const test = await User.find();
    console.log("All users:", test);

    const existingUser = await User.findOne({ username });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    const existingEmail1 = await User.findOne({ email });
    console.log("Existing email:", existingEmail1);

    if (existingEmail1) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered successfully", user, token });
    //send email welcome email
    const profileUrl = `${process.env.CLIENT_URL}/profile/${user._id}`;
    try {
      await sendWelcomeEmail(user.email, user.name,profileUrl);
    } catch (error) {
      console.log("Error sending email:", error);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password!" });
    } 
    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Set the token in a cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Send the user data and token in the response
    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (error) {
    console.error("Error during login:", error);
  }
};
export const logout = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  // Optionally, you can also invalidate the JWT on the server side if you're using a token-based authentication system.
  res.status(200).json({ message: "User logged out successfully!" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user; // The user is set in the middleware
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}