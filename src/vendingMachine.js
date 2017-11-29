class VendingMachine {
    constructor(data) {
        this.data = data;
    }

    //move invent to here
    printInventory() {
        return this.data.inventory;
    }
    restock(itemID) {
        const par = 20;
        const currentStock = this.data.inventory[itemID].quantity;
        if (currentStock <= 5) {
            return par - currentStock + currentStock;
        } else {
            return currentStock;
        }
    }
    resupplyChange(coin, par) {
        const coinStock = this.data.change[coin].quantity;
        if (coinStock <= par / 3) {
            return par - coinStock + coinStock;
        } else {
            return coinStock;
        }
    }
    dispence(balance, itemID) {
        if (balance && itemID) {
            const itemPrice = this.data.inventory[itemID].price;
            if (balance > itemPrice) {
                return "Thank You";
            } else {
                return "Insufficient Funds";
            }
        }
        if (itemID) {
            return this.data.inventory[itemID].price;
        }
        if (balance) {
            return "Select Item";
        } else {
            return "Please insert coins";
        }
    }
    returnChange( changeBack ) {
        var change = {}
        var a = changeBack
        for(let i in this.data.change){
            let changeValue = Math.trunc(a / this.data.change[i].value)
            if( changeValue > 0 && a > 0) {
                change[i] = changeValue
                a = a - (changeValue*this.data.change[i].value)
            }
        }
        return change
    }
}

module.exports = VendingMachine;
