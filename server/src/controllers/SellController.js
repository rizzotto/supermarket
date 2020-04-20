const mongoose  =require('mongoose');
const Sell = mongoose.model("Sell");

module.exports = {
    /**
     * Creates a new Sell and stores it in the database
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Number} Status if operation is not allowerd
     * @returns {JSON} If Sell is created
     */
    async create(req, res) {
        if (!req.app.locals.isOpen) {
            return res.sendStatus(400)
        }
        const { products } = req.body;
        let value = 0;
        products.map((product) => {
            value += product.price;
        });

        const sell = await Sell.create({ value });

        res.json(sell);
    }, 

    /**
     * Returns all the sales from current date
     * @param {Request} req 
     * @param {Response} res
     * @returns {JSON}
     */
    async getCurrentDaySales(req, res){
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const fullDate = day + "/" + month + "/" + year;

        const sales = await Sell.find({ createdAt: fullDate });
        return res.json(sales);
    }
}