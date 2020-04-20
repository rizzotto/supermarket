const express = require("express");
const mongoose = require("mongoose");
const requiredir = require("require-dir");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//Stores if the current day operations are open or not (bool)
app.locals.isOpen = false

mongoose.connect(
  "mongodb+srv://Rizzotto:1234@cluster0-1whvi.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

requiredir("./src/models");

app.use("/", require("./src/routes"));

app.listen(8080);