import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "Hey there! I am using Message.",
    },
  },
  { timestamps: true }, // help to automatically add createdAt, updatedAt and last login.
);

const User = mongoose.model("User", userSchema);

export default User;
