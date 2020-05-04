module.exports = {

    formatToBRCurrency(value){
        return (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value))
    }
}