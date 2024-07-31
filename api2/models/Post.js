const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, //allows us to know when post is created and updated
  }
);

const Posts = model("Post", PostSchema);

module.exports = Posts;
