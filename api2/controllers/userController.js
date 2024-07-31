const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await User.findById(id);
    if (!data) res.status(401).json("No such User exists");
    else res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const updatedFields = {};
    if (email) updatedFields.email = email;

    if (newPassword) {
      const user = await User.findById(req.user.id);
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Old password is incorrect" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updatedFields.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
      new: true,
    });
    res
      .status(200)
      .json({ success: true, username: user.username, email: user.email });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
