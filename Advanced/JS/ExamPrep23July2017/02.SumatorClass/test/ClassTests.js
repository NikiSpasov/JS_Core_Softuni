let expect = require("chai").expect;
let Sumator = require("../classToBeTested");

describe("Sumator tests", function () {

   describe("initial", function () {
       it('should be init correctly with empty constructor', function () {
           expect(() => {let testSumator = new Sumator()}).to.not.throw();
       });
       it('should have own property data', function () {
           let testSumator = new Sumator();
           expect(testSumator.hasOwnProperty("data")).to.be.eq(true)
       });
       it('should have own func add', function () {
           let testSumator = new Sumator();
           expect(Object.getPrototypeOf(testSumator).hasOwnProperty("add")).to.be.eq(true)
       });
       it('should have own func sumNums', function () {
           let testSumator = new Sumator();
           expect(testSumator.__proto__.hasOwnProperty("sumNums")).to.be.eq(true)
       });
       it('should have own func removeByFilter', function () {
           let testSumator = new Sumator();
           expect(testSumator.__proto__.hasOwnProperty("removeByFilter")).to.be.eq(true)
       });
       it('should have own func toString', function () {
           let testSumator = new Sumator();
           expect(testSumator.__proto__.hasOwnProperty("toString")).to.be.eq(true)
       });
       it('should have array for this data', function () {
           let testSumator = new Sumator();
           let arr = testSumator.data;
           expect(Array.isArray(arr)).to.be.equal(true)
       });
       it('should have empty array for this data', function () {
           let testSumator = new Sumator();
           let arr = testSumator.data;
           expect(arr.length).to.be.equal(0);
       });
       it('should add any type data', function () {
           let testSumator = new Sumator();
           expect(() => {
               testSumator.add({});
               testSumator.add([]);
               testSumator.add("");
               testSumator.add(4);
               testSumator.add(()=>{});
               testSumator.add(4.45);
               testSumator.add(-4);
               testSumator.add(-4.433);
           }).to.not.throw();
       });

       it('should sum only nums', function () {
           let testSumator = new Sumator();
           testSumator.add({});
           testSumator.add([]);
           testSumator.add("");
           testSumator.add(4);
           testSumator.add(()=>{});
           testSumator.add(4.45);
           testSumator.add(-4);
           testSumator.add(-4.55);
           expect(testSumator.sumNums()).to.closeTo(0.1, 5);
       });

       it('should return 0 if there is no nums at all', function () {
           let testSumator = new Sumator();
           expect(testSumator.sumNums()).to.equal(0);
       });
       it('should return 0 if there is no nums in array', function () {
           let testSumator = new Sumator();
           testSumator.add({});
           testSumator.add([]);
           testSumator.add("");
           expect(testSumator.sumNums()).to.equal(0);
       });
   });

    describe("removeByFilter", function () {
        it('should be remove digits < 10 ', function () {
            let testSumator = new Sumator();
            testSumator.add(8);
            testSumator.add(9);
            testSumator.add(10);
            testSumator.add(11);
            testSumator.add(12);

            testSumator.removeByFilter((a) => a < 10);
            expect(testSumator.sumNums()).to.be.equal(33);
            expect(testSumator.data).to.be.eql([10, 11, 12])
        });
        it('should be remove digits > 10 ', function () {
            let testSumator = new Sumator();
            testSumator.add(8);
            testSumator.add(9);
            testSumator.add(10);
            testSumator.add(11);
            testSumator.add(12);
            testSumator.removeByFilter((a) => a > 10);
            expect(testSumator.sumNums()).to.be.equal(27);
            expect(testSumator.data).to.be.eql([8, 9, 10])
        });
    });

    describe("toString", function () {
        it('should return empty ', function () {
            let testSumator = new Sumator();
            expect(testSumator.toString()).to.be.eq("(empty)")
        });
        it('should return joined', function () {
            let testSumator = new Sumator();
            testSumator.add(8);
            testSumator.add(9);
            testSumator.add(10);
            expect(testSumator.toString()).to.be.eql("8, 9, 10")
        });
    });
});