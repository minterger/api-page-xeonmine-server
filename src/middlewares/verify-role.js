const User = require("../models/User");
const Role = require("../models/Role");

const verifyRole = {};

verifyRole.isAdmin = async (req, res, next) => {
  try {
    // get user
    const user = await User.findById(req.user._id);
    // get roles for user
    const roles = await Role.find({ _id: { $in: user.roles } });

    // verify role admin
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === "admin") {
        //return if is admin
        return next();
      }
    }
    
    // message if no is admin
    return res.status(403).json({ message: "require role admin" });
  } catch (err) {
    return res.status(500).send({ message: error });
  }
};

verifyRole.isModerator = async (req, res, next) => {
  try {
    // get user
    const user = await User.findById(req.user._id);
    // get roles for user
    const roles = await Role.find({ _id: { $in: user.roles } });

    // verify role moderator
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === "moderator") {
        //return if is moderator
        return next();
      }
    }
    
    // message if no is moderator
    return res.status(403).json({ message: "require role moderator" });
  } catch (err) {
    return res.status(500).send({ message: error });
  }
};

module.exports = verifyRole;
