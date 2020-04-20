const express = require("express");
const mongoose = require("mongoose");
const requiredir = require("require-dir");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//se a gente for usar banco, q a sora falou q n precisa, da p usar com docker
mongoose.connect("mongodb://localhost:27017/supermarket", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

requiredir("./src/models");

app.use("/", require("./src/routes"));

app.listen(8080);
