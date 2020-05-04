const mongoose = require("../database/mongooseConn")
const Product = mongoose.model("Product");

module.exports = {
    async index(){
        return await Product.find()
    }, 

    async delete(id){
        return Product.findOneAndDelete(id);
    },

    async create(product){
       return Product.create(product);
    }
}