const express = require("express");

const routes = express.Router();

routes.get("/supermarket", (req, res) => {
  res.send("test");
});

module.exports = routes;
