const authCtrl = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Role = require("../models/Role.js");
const { validationResult } = require("express-validator");

authCtrl.signUp = async (req, res) => {
  try {
    const { name, lastName, username, email, password, roles } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = new User({
      name,
      lastName,
      username,
      email,
    });

    //asign role
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.find({ name: "user" });
      newUser.roles = [role._id];
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    const savedUser = await newUser.save();

    const token = await jwt.sign(
      { id: savedUser._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

authCtrl.signIn = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ token: null, errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        token: null,
        error: "El email o la contraseña no coinciden",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        token: null,
        error: "El email o la contraseña no coinciden",
      });
    }

    const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    });

    return res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authCtrl;
