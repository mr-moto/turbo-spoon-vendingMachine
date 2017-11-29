const vendingMachine = require("../src/vendingMachine.js");

describe("vendingMachine", () => {
    beforeEach(() => {
        test = {};
        test.processedData = {
            inventory: {
                1: {
                    product: "nuts",
                    quantity: 18,
                    price: 1.25
                },
                2: {
                    product: "eggplant",
                    quantity: 5,
                    price: 1.45
                },
                3: {
                    product: "water gun",
                    quantity: 2,
                    price: 1.7
                }
            },
            change: {
                'toonies': {
                    quantity: 15,
                    value: 2.0
                },
                'loonies': {
                    quantity: 40,
                    value: 1.0
                },
                'quarters': {
                    quantity: 50,
                    value: 0.25
                },
                'dimes': {
                    quantity: 50,
                    value: 0.1
                },
                'nickels': {
                    quantity: 30,
                    value: 0.05
                }
            }
        };
        test.subject = new vendingMachine(test.processedData);
    });

    describe("When printing vending machine inventory", () => {
        it("Should return inventory", () => {
            expect(test.subject.printInventory()).toMatchObject(
                test.processedData.inventory
            );
        });
    });
    describe("When invent is low", () => {
        it("Should restock", () => {
            expect(test.subject.restock(1)).toBeGreaterThan(5);
        });
    });
    describe("When coin quantity is below a third of par", () => {
        it("Should increment toonie quantity to par", () => {
            expect(test.subject.resupplyChange('toonies', 60)).toBeGreaterThan(60/3)
        });
        it("Should increment quarters quantity to par", () => {
            expect(test.subject.resupplyChange('quarters', 10000)).toBeGreaterThan(10000/3)
        });
    });
    describe("When coins/item are inserted/selected", () => {
        it("Should check for balance", () => {
            expect(test.subject.dispence()).toBe('Please insert coins')
        });
        it("Should dispense item if there are sufficient funds", () => {
            expect(test.subject.dispence(3.00, 1)).toBe('Thank You')
        });
        it("Should display insufficient funds", () => {
            expect(test.subject.dispence(1.5, 3)).toBe('Insufficient Funds')
        });
        it("Should ask you to select an item", () => {
            expect(test.subject.dispence(1000)).toBe('Select Item')
        })
    });
    describe("When returning change", () => {
        it("Should return correct change given that the change returned is $2.75", () => {
            expect(test.subject.returnChange(2.75)).toEqual({ toonies: 1, quarters: 3})
        });
        it("Should return correct change given that the change returned is $100.35", () => {
            expect(test.subject.returnChange(100.35)).toEqual({ toonies: 50, quarters: 1, nickels: 1})
        });
    });
});
