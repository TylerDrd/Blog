const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const finduser = await User.findOne({ username });
  if (!finduser) {
    return res.status(401).send("User not found");
  }

  const passOk = await bcrypt.compare(password, finduser.password);
  if (passOk) {
    jwt.sign(
      { username: finduser.username, id: finduser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ username, id: finduser._id, token });
      }
    );
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};
