const Role = require("../models/Role");
const User = require("../models/User");

const bcrypt = require("bcrypt");

const iSetup = {};

iSetup.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (err) {
    console.log(err);
  }
};

iSetup.createAdminUser = async () => {
  try {
    const user = await User.findOne({ email: "xeonmine@mail.com" });
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
      await User.create({
        name: "Admin",
        lastName: "XeonMine",
        username: "XeonMine",
        email: "xeonmine@mail.com",
        password: await bcrypt.hash("Xeonpass123!", 10),
        role: roles.map((role) => role._id),
      });
      console.log("Usuario Admin Creado!");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = iSetup;
