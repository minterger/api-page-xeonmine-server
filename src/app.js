const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { createRoles, createAdminUser } = require("./libs/initialSetup");

const app = express();

createRoles();
createAdminUser();

//config

//initializations
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//middlewares

//Routes
app.use(require("./routes/auth.routes"));
app.use(require("./routes/users.routes"));

module.exports = app;
