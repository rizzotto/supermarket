const express = require("express");
const routes = express.Router();

const ManagerController = require('./controllers/ManagerController')
const ProductController = require('./controllers/ProductController')
const SellController = require('./controllers/SellController')

//ProductController
routes.post("/product", ProductController.create);
routes.get("/product", ProductController.index);
routes.delete("/delete", ProductController.delete);

//ManagerController
routes.post("/openDay", ManagerController.openDay);
routes.post("/closeDay", ManagerController.closeDay);
routes.get("/getDayStatus", ManagerController.getDayStatus)

//SellController
routes.post("/registerSell", SellController.create);
routes.post("/registerSell", SellController.create);
routes.get("/getSales", SellController.getCurrentDaySales);

module.exports = routes;
