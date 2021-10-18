const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../middlewares/index");
const { createPreference } = require("../controllers/mp.controller");

router.post("/preference", verifyToken, createPreference);

module.exports = router;
