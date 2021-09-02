const authCtrl = {};
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { validationResult } = require("express-validator");

authCtrl.signUp = async (req, res) => {
  const { name, username, email, password } = req.body;
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

  return res.json(newUser);
};

authCtrl.signIn = (req, res) => {};

module.exports = authCtrl;
