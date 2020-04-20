const express = require("express");
// const mongoose = require('mongoose')
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//se a gente for usar banco, q a sora falou q n precisa, da p usar com docker
// mongoose.connect('mongodb://localhost:27017/nodeapi', { useUnifiedTopology: true, useNewUrlParser: true })

app.use("/", require("./src/routes"));

app.listen(8080);
