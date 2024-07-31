const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization || "";
    if (!token) {
      return res.status(401).json({ message: "login first" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = auth;
