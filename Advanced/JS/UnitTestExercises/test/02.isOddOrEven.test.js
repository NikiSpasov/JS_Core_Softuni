let isOddOrEven = require("../02.EvenOrOdd").isOddOrEven;
let expect = require("chai").expect;

describe("validOutput", function () {
    it('should be even', function () {
        expect(isOddOrEven("four")).to.equal("even", "function not return correct result");
    });
    it('should be even', function () {
        expect(isOddOrEven("is it even")).to.equal("even", "function not return correct result");
    });
    it('should be odd', function () {
        expect(isOddOrEven("our")).to.equal("odd", "function not return correct result");
    })});

    describe ("invalidInput", function () {
        it('should be undefined with num', function () {
            expect(isOddOrEven(76)).to.be.undefined;
        });
        it('should be undefined with object', function () {
            expect(isOddOrEven({arr: []})).to.be.undefined;
        });
        it('should be undefined with arr', function () {
            expect(isOddOrEven( [])).to.be.undefined;
        });
        it('should be undefined with nums args', function () {
            expect(isOddOrEven(25, 34, 56, 34)).to.be.undefined;
        });
    });