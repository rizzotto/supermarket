const express = require("express");
const routes = express.Router();

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

routes.get("/open", (req, res) => {
  const date = new Date();
  res.send({
    date,
  });
});

routes.post("/registerSell", (req, res) => {
  const date = new Date();
  // res.send({
  //   date,
  // });
  console.log(product + "   " + code + "   " + price);
});

routes.post("/product", async (req, res) => {
  const product = await Product.create(req.body);
  return res.json(product);
});

module.exports = routes;
