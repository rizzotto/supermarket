const mongoose = require('mongoose')
const Sale = mongoose.model('Sale')

module.exports = {
  /**
   * Creates a new Sale and stores it in the database
   * @param {Request} req
   * @param {Response} res
   * @returns {Number} Status if operation is not allowerd
   * @returns {JSON} If Sale is created
   */
  async create(req, res) {
    if (!req.app.locals.isOpen) {
      return res.sendStatus(400)
    }
    const { products, payment } = req.body
    let value = 0
    products.map((product) => {
      value += product.price
    })
    console.log(req.body)
    const sale = await Sale.create({ value, payment })

    res.json(sale)
  },

  /**
   * Returns all the sales from current date
   * @param {Request} req
   * @param {Response} res
   * @returns {JSON}
   */
  async getCurrentDaySales(req, res) {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const fullDate = day + '/' + month + '/' + year

    const sales = await Sale.find({ createdAt: fullDate })
    return res.json(sales)
  },
}
