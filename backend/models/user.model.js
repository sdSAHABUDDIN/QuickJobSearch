// This file defines the User model for the application using Mongoose.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  bannerImage: {
    type: String,
    default: "",
  },
  headline: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        default: "",
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        default: null,
      },
      description: {
        type: String,
        default: "",
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        default: "",
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        default: null,
      },
    },
  ],
  connections:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  }]
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;