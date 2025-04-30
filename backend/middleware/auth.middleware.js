import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}