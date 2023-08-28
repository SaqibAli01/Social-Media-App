import { Schema, model } from "mongoose";

const createGroupSchema = new Schema({
  name: { type: String, required: true },
  privacy: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  inviteFriends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  avatar: {
    type: String,
    default: "",
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["admin"],
  },
  fileUrl: { type: String },


  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Group = model("Group", createGroupSchema);
