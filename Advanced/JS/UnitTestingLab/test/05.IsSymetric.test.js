let isSymetric = require("../05.IsSymetric").isSymmetric;
let expect = require("chai").expect;

describe("isSymetric", function () {
    it('should return for string as argument', function () {
        expect(isSymetric("something")).to.be.equal(false);
    });
    it('should return false for Object as argument', function () {
        expect(isSymetric({something:"something"})).to.be.equal(false);
    });
    it('should return true for "[1,2,3,3,3,2,1])"', function () {
        expect(isSymetric([1,2,3,3,2,1])).to.be.equal(true);
    });
    it('should return false for [1,2,3,4,2,1]', function () {
        expect(isSymetric([1,2,3,4,2,1])).to.be.equal(false)
    });
    it('should return true for one element', function () {
       expect(isSymetric([1])).to.be.equal(true)
    });
    it('should return true for [-2, 1, -1]', function () {
        expect(isSymetric([-2, 1, -2])).to.be.equal(true);
    });
});