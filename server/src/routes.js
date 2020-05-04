const express = require('express')
const routes = express.Router()

const ManagerController = require('../../view/src/controllers/ManagerController')
const ProductController = require('../../view/src/controllers/ProductController')
const SaleController = require('../../view/src/controllers/SaleController')

//ProductController
routes.post('/product', ProductController.create)
routes.get('/product', ProductController.index)
routes.delete('/delete', ProductController.delete)

//ManagerController
routes.post('/openDay', ManagerController.openDay)
routes.post('/closeDay', ManagerController.closeDay)
routes.get('/getDayStatus', ManagerController.getDayStatus)

//SaleController
routes.post('/registerSale', SaleController.create)
routes.get('/getSales', SaleController.getCurrentDaySales)

module.exports = routes
