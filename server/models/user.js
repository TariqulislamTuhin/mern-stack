import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    secret: {
      type: String,
      required: true,
      lowercase: true,
      default: "",
    },
    about: {},
    photo: String,
    following: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  //second arg is timestamp
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
