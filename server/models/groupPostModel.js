import { Schema, model } from "mongoose";

const postGroupSchema = new Schema({
  text: { type: String },
  file: { type: String },
  fileUrl: { type: String },
  fileName: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  group: { type: Schema.Types.ObjectId, ref: "Group" },
});

export const PostGroup = model("PostGroup", postGroupSchema);
