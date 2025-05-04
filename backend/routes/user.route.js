import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections,getPublicProfile,updateProfile } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile); // Example for another route

router.put("/profile",protectRoute,updateProfile); // Example for another route
export default router;
