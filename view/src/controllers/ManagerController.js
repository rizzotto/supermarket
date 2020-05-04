module.exports = {

    openDay(req, res){
        const curDay = new Date();
        return {date: curDay.toLocaleTimeString(), isOpen: true};
    }, 

    closeDay(){
        const curDay = new Date();
        return {date: curDay.toLocaleTimeString(), isOpen: false};
    },

    getDayStatus(){
        return true;
    }
}