const express = require("express");
const mongoose = require("./config/database")
const requiredir = require("require-dir");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//Stores if the current day operations are open or not (bool)
app.locals.isOpen = false

requiredir("./src/models");

app.use("/", require("./src/routes"));

app.listen(8080);
