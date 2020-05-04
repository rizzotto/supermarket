const mongoose = require("../database/mongooseConn")
const Sale = mongoose.model('Sale')

module.exports = {
  async create(sale) {
    const { products, payment } = sale
    let value = 0
    products.map((product) => {
      value += product.price
    })
   return (await Sale.create({ value, payment }))
  },

  async getCurrentDaySales() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const fullDate = day + '/' + month + '/' + year
    return (await Sale.find({ createdAt: fullDate }))
  },
}
