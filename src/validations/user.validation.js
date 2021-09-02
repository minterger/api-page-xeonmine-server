const { body } = require("express-validator");
const User = require("../models/User");
const validations = {};

validations.registerValidation = [
  body("name", "Se requiere un nombre").not().isEmpty(),
  body("username", "Se requiere un nombre de usuario").not().isEmpty(),
  body("email", "Se requiere un Email valido").isEmail().normalizeEmail(),
  //verificar si el email se encuentra en uso
  body("email").custom(async (value) => {
    const userExist = await User.findOne({ email: value });
    if (userExist) {
      return Promise.reject("El Email se encuentra en uso");
    }
  }),
  body("password", "La contraseña debe ser mayor a 6 digitos").isLength({
    min: 6,
  }),
  // verificar que password y confirmPassword coincidan
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }

    return true;
  }),
];

validations.loginValidation = [
  body("email", "Ingresa un Email valido").isEmail().normalizeEmail(),
  body("password", "La contraseña debe ser mayor a 6 digitos").isLength({
    min: 6,
  }),
];

module.exports = validations;
