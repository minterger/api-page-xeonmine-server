const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userCtrl = {};

userCtrl.getUserData = (req, res) => {
    res.json(req.user)
};

module.exports = userCtrl;
