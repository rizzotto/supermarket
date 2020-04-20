const express = require("express");
const routes = express.Router();

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

let isOpen = false
let curDay = new Date()

/**
 * Opens the current day as able to register sells
 * @returns {Response}
 */
routes.post("/openDay", (req, res) => {
  if(isOpen){
    return res.sendStatus(400)
  }
  isOpen = true
  return res.send('Day opened.')
});

/**
 * Closes the current day, no more sells allowed.
 * @returns {Response}
 */
routes.post("/closeDay", (req, res) => {
  if(!isOpen){
    return res.sendStatus(400)
  }
  isOpen = false
  //Make report of sales
  return res.send('Day closed.')
});

routes.post("/registerSell", (req, res) => {
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
