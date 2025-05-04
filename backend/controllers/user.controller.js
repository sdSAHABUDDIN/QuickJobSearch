import User from "../models/user.model.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUserId =await User.findById(req.user.id).select("connections");
    //find users who are not already connected to the current user and also do not recommend our own profile 
    const suggestedConnections = await User.find({
      _id: { $ne: currentUserId },
      connections: { $nin: currentUserId.connections },
    }).select ("name username profilePicture headline").limit(10); // Limit to 10 suggestions
    res.status(200).json(suggestedConnections);
  } catch (error) {
    console.error("Error fetching suggested connections:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }
}
export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username:req.params.username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    console.error("Error fetching public profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "headline", "location", "about", "skills"];
    const updatedData={};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedData[field] = req.body[field];
      }
    }
    // Check if the user exists
    const user = await User.findByIdAndUpdate(req.user.id,{$set:updatedData},{new:true})
   .select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}