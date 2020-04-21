module.exports = {

    /**
     * Opens the current day as able to register sells
     * @param {Request} req
     * @param {Response} res
     * @returns {Date}
     */
    openDay(req, res){
        if (req.app.locals.isOpen) {
            return res.sendStatus(400);
        }
        req.app.locals.isOpen = true
        const curDay = new Date();
        return res.json({date: curDay.toLocaleTimeString(), isOpen: true});
    }, 

    /**
     * Closes the current day, no more sells allowed.
     * @param {Request} req
     * @param {Response} res
     * @returns {String}
     */
    closeDay(req, res){
        if (!req.app.locals.isOpen) {
            return res.sendStatus(400);
        }
        req.app.locals.isOpen = false;
        const curDay = new Date();
        return res.json({date: curDay.toLocaleTimeString(), isOpen: false});
    },

    /**
     * Returns the current day operating status (true or false)
     * @param {Request} req 
     * @param {Response} res
     */
    getDayStatus(req, res){
        res.send(req.app.locals.isOpen)
    }
}