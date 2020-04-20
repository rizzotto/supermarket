const express = require("express");
const routes = express.Router();

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Sell = mongoose.model("Sell");

let isOpen = false;
let curDay = new Date();

//Products
routes.post("/product", async (req, res) => {
  const product = await Product.create(req.body);
  return res.json(product);
});

routes.get("/product", async (req, res) => {
  const products = await Product.find();
  return res.json(products);
});

routes.delete("/delete", async (req, res) => {
  await Product.findOneAndDelete(req.params.id);
  return res.send("Deleted");
});

//gerente
/**
 * Opens the current day as able to register sells
 * @returns {Response}
 */
routes.post("/openDay", (req, res) => {
  if (isOpen) {
    return res.sendStatus(400);
  }
  isOpen = true;
  return res.send(curDay);
});

/**
 * Closes the current day, no more sells allowed.
 * @returns {Response}
 */
routes.post("/closeDay", (req, res) => {
  if (!isOpen) {
    return res.sendStatus(400);
  }
  isOpen = false;
  //Make report of sales
  return res.send("Day closed.");
});

//caixa
routes.post("/registerSell", async (req, res) => {
  const { products } = req.body;
  let value = 0;
  products.map((product) => {
    value += product.price;
  });

  const sell = await Sell.create({ value });

  res.json(sell);
});

routes.get("/getSales", async (req, res) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = day + "/" + month + "/" + year;

  const sales = await Sell.find({ createdAt: fullDate });
  return res.json(sales);
});

module.exports = routes;
