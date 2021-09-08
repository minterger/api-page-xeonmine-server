const { Router } = require("express");
const { getUserData } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/index");
const router = Router();

router.get("/datauser", verifyToken, getUserData);

module.exports = router;
