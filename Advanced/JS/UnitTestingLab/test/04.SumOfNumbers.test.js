let expect = require("chai").expect;
let sum = require("../04.SumOfNumbers").sum;

describe("sum(arr)", function () {
    it('should take an Array for argument', function () {
        expect(sum("nishto")).to.be.NaN
    });
    it("should return 3 for [1,2]", function () {
        expect(sum([1,2])).to.be.equal(3);
    });
    it('should return 3.6 for [1.2 ,1.2, 1.2]', function () {
        expect(sum([1,2,2])).to.be.equal(5);
    });
    it('should return -5', function () {
        expect(sum([10, -15, 0])).to.be.equal(-5);
    });
});


