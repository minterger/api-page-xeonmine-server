const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(id)
      .select("-__v -password")
      .populate("roles", ["name"]);

    if (!user) return res.status(404).json({ message: "No user found" });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
