const express = require("express");
const {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsByUsername,
} = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", auth, upload.single("file"), createPost);
router.put("/", auth, upload.single("file"), updatePost);
router.get("/", auth, getAllPosts);
router.get("/:id", auth, getPostById);
router.get("/user/:username", auth, getPostsByUsername);

module.exports = router;
