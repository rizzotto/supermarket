const mongoose  =require('mongoose');
const Product = mongoose.model("Product");

module.exports = {
    /**
     * Lists all the products in the supermarket
     * @param {Request} req 
     * @param {Response} res 
     * @returns {JSON}
     */
    async index(req, res){
        const products = await Product.find();
        return res.json(products);
    }, 

    /**
     * Deletes a product from the database, given it´s id
     * @param {Request} req 
     * @param {Response} res 
     * @returns {String}
     */
    async delete(req, res){
        await Product.findOneAndDelete(req.params.id);
        return res.send("Deleted");
    },

    /**
     * Stores a new product in the database
     * @param {Request} req 
     * @param {Response} res 
     * @returns {JSON} 
     */
    async create(req, res){
        const product = await Product.create(req.body);
        return res.json(product);
    }
}