import { Schema, model } from "mongoose";

const postGroupSchema = new Schema({
  text: { type: String },
  file: { type: String },
  fileUrl: { type: String },
  fileName: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  group: { type: Schema.Types.ObjectId, ref: "Group" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const PostGroup = model("PostGroup", postGroupSchema);
