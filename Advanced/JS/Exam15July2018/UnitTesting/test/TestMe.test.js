let expect = require("chai").expect;
let Calculator = require("../classAgainst");

describe("test the calc", function () {

    let test;
    beforeEach(function () {
        test = new Calculator();
    });

    describe("init", function () {
        it('should be initialized without errors with empty constr', function () {
            expect(() => {
                let testCalc = new Calculator()
            }).to.not.throw();
        });
        it('should have property expenses', function () {
            expect(test.hasOwnProperty("expenses")).to.be.equal(true);
        });
        it('should be area for expenses', function () {
            expect(Array.isArray(test.expenses)).to.be.equal(true);
        });
        it('should have emtptyArea for expenses', function () {
            expect(test.expenses.length).to.be.equal(0);
        });
        it('should have own func add', function () {
            expect(Object.getPrototypeOf(test).hasOwnProperty("add")).to.be.eq(true)
        });
        it('should have own func divideNums', function () {
            expect(Object.getPrototypeOf(test).hasOwnProperty("divideNums")).to.be.eq(true)
        });
        it('should have own func toString', function () {
            expect(Object.getPrototypeOf(test).hasOwnProperty("toString")).to.be.eq(true)
        });
        it('should have own func orderBy', function () {
            expect(Object.getPrototypeOf(test).hasOwnProperty("orderBy")).to.be.eq(true)
        });
    });

    describe("addData", function () {
        it('should add any type data', function () {
            let testSumator = new Calculator();
            expect(() => {
                testSumator.add({});
                testSumator.add([]);
                testSumator.add("");
                testSumator.add(4);
                testSumator.add(() => {
                });
                testSumator.add(4.45);
                testSumator.add(-4);
                testSumator.add(-4.433);
            }).to.not.throw();
        });
        it('should sum only nums', function () {
            let testSumator = new Calculator();
            testSumator.add({});
            testSumator.add([]);
            testSumator.add("");
            testSumator.add(4);
            testSumator.add(() => {
            });
            testSumator.add(4.45);
            testSumator.add(-4);
            testSumator.add(-4.55);
            expect(testSumator.divideNums()).to.closeTo(0.1, 5);
        });
        it('should throw "There are no numbers in the array!"  if there is no nums at all', function () {
            let testSumator = new Calculator();
            expect(() => testSumator.divideNums()).to.throw("There are no numbers in the array!");
        });
        it('should throw 0 if there is no nums in array', function () {
            let testSumator = new Calculator();
            testSumator.add({});
            testSumator.add([]);
            testSumator.add("");
            expect(() => testSumator.divideNums()).to.throw("There are no numbers in the array!");
        });
    });

    describe("divideNums() OK", function () {
        it('should divide two positive nums', function () {
            let testSumator = new Calculator();
            testSumator.add(8);
            testSumator.add(2);
            expect(testSumator.divideNums()).to.be.equal(4);
        });
        it('should divide more positive nums', function () {
            let testSumator = new Calculator();
            testSumator.add(27);
            testSumator.add(3);
            testSumator.add(3);
            expect(testSumator.divideNums()).to.be.equal(3);
        });
        it('should calc positive and negative nums', function () {
            let testSumator = new Calculator();
            testSumator.add(-9);
            testSumator.add(3);
            expect(testSumator.divideNums()).to.be.equal(-3);
        });
        it('should calc positive and negative nums', function () {
            let testSumator = new Calculator();
            testSumator.add(-9);
            testSumator.add(3);
            testSumator.add(-1);
            expect(testSumator.divideNums()).to.be.equal(3);
        });
        it('should calc positive and negative nums', function () {
            let testSumator = new Calculator();
            testSumator.add(-9);
            testSumator.add(-3);
            testSumator.add(-1);
            expect(testSumator.divideNums()).to.be.equal(-3);
        });
        it('should calc fractions and negative nums', function () {
            let testSumator = new Calculator();
            testSumator.add(-4.6);
            testSumator.add(2);
            expect(testSumator.divideNums()).to.be.equal(-2.3);
        });
        it('should calc fractions and negative nums', function () {
            let testSumator = new Calculator();
            testSumator.add(-4.6);
            testSumator.add(-2.2);
            expect(testSumator.divideNums()).to.be.closeTo(2.09, 2);
        });
    });

    describe("to string", function () {
        it('should return a string', function () {
            let testSumator = new Calculator();
            testSumator.add({});
            testSumator.add("Pesho");
            testSumator.add(4);
            testSumator.add(-15);
            expect(typeof testSumator.toString()).to.be.equal("string")
        });

        it('should return all joined with " -> "', function () {
            let test = new Calculator();
            test.add(10);
            test.add("Pesho");
            test.add("5");
            expect(test.toString()).to.be.equal("10 -> Pesho -> 5")
        });

        it('should return all joined with " -> "', function () {
            let testSumator = new Calculator();
            testSumator.add({});
            testSumator.add("Pesho");
            testSumator.add(4);
            testSumator.add(-15);
            testSumator.add(3.2);
            expect(testSumator.toString()).to.be.equal("[object Object] -> Pesho -> 4 -> -15 -> 3.2")
        });
        it('should return empty array', function () {
            expect(test.toString()).to.be.equal("empty array")
        });
    });
    describe("orderBy", function () {
        it('should return a string', function () {
            let testSumator = new Calculator();
            testSumator.add({});
            testSumator.add("Pesho");
            testSumator.add(4);
            testSumator.add(-15);
            testSumator.add(3.2);
            expect(typeof testSumator.orderBy()).to.be.equal('string')
        });
        it('should order nums a string', function () {
            let output = new Calculator();
            output.add(10);
            output.add("Pesho");
            output.add("5");
            output.add(10);
            output.divideNums();
            output.add(1);
            expect(output.orderBy()).to.be.equal('1, 1')
        });
        it('should order mixed data and nums a string', function () {
            let output = new Calculator();
            output.add(9);
            output.add(10);
            output.add("Pesho");
            output.add(8);
            output.add("Abba");
            output.add("Valery");
            expect(output.orderBy()).to.be.equal('10, 8, 9, Abba, Pesho, Valery')
        });
        it('should order mixed data incr', function () {
            let output = new Calculator();
            output.add("Pesho");
            output.add("Abba");
            output.add("Valery");
            expect(output.orderBy()).to.be.equal('Abba, Pesho, Valery')
        });
        it('should order only nums increase', function () {
            let output = new Calculator();
            output.add(9);
            output.add(10);
            output.add(8);
            expect(output.orderBy()).to.be.equal('8, 9, 10')
        });
        it('should order nums decr in mixed data', function () {
            let output = new Calculator();
            output.add(9);
            output.add(10);
            output.add("Pesho");
            output.add(8);
            output.add("Abba");
            output.add("Valery");
            let a = output.orderBy().split(', ');
            expect(a[0]).to.be.equal('10');
            expect(a[1]).to.be.equal('8');
            expect(a[2]).to.be.equal('9');
        });
    });
});
