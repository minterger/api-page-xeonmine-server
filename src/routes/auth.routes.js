const { Router } = require("express");
const router = Router();
const { signUp, signIn } = require("../controllers/auth.controller");
const { registerValidation, loginValidation } = require("../validations/user.validation");

router.post("/signup", registerValidation, signUp);

router.post("/signin", loginValidation, signIn);

module.exports = router;
