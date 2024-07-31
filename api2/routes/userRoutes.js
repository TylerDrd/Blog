const express = require("express");
const {
  getProfile,
  updateProfile,
  getUserByUsername,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.get("/:username", auth, getUserByUsername);

module.exports = router;
