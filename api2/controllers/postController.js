const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    fs.renameSync(path, newPath);

    const token = req.headers.authorization;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
      if (err) return res.status(401).json({ error: "Invalid token" });
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (error) {
    console.error("Error processing the post request", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    newPath = path + "." + extension;
    fs.renameSync(path, newPath);
  }

  const token = req.headers.authorization;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    const { id, title, summary, content } = req.body;
    const postdoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postdoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the Author!");
    }

    postdoc.title = title;
    postdoc.summary = summary;
    postdoc.content = content;
    postdoc.cover = newPath ? newPath : postdoc.cover;
    await postdoc.save();
    res.json(postdoc);
  });
};

exports.getAllPosts = async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const postid = await Post.findById(id).populate("author", ["username"]);
  res.json(postid);
};

exports.getPostsByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ author: user._id })
      .populate("author", ["username"])
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
