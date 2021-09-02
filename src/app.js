const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//config

//initializations
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//middlewares

//Routes
app.use(require("./routes/auth.routes"));

module.exports = app;
