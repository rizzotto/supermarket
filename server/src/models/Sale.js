const mongoose = require('mongoose')

const date = new Date()

const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

const SaleSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default: day + '/' + month + '/' + year,
  },
  payment: {
    type: String,
    required: true,
  },
})

mongoose.model('Sale', SaleSchema)
