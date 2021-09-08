const authCtrl = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { validationResult } = require("express-validator");

authCtrl.signUp = async (req, res) => {
  const { name, lastName, username, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newUser = new User({
    name,
    username,
    email,
  });

  const salt = await bcrypt.genSalt(10);

  newUser.password = await bcrypt.hash(password, salt);

  const savedUser = await newUser.save();

  const token = await jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);

  return res.json({
    token,
  });
};

authCtrl.signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      token: "null",
      error: "El email o la contraseña no coinciden",
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(400).json({
      token: "null",
      error: "El email o la contraseña no coinciden",
    });
  }

  const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

  return res.json({
    token,
  });
};

module.exports = authCtrl;
