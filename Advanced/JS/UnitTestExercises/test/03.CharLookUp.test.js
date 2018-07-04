let charLookUp = require("../03.CharLookup").lookupChar;
let expect = require("chai").expect;

describe ("validCases", function () {
    it('should return g', function () {
        expect(charLookUp("gosho", 0)).to.equal("g", "Invalid char returned")
    });
});
describe ("invalidCases", function () {
    it('should return undefined because first arg is not a string', function () {
        expect(charLookUp([], 0)).to.equal(undefined, "It must return undefined")
    });
    it('should return undefined because second arg is not an int', function () {
        expect(charLookUp("gosho", 1.3)).to.equal(undefined, "It must return undefined")
    });
    it('should return undefined because second arg is not an int', function () {
        expect(charLookUp("gosho", -1.3)).to.equal(undefined, "It must return undefined")
    });
    it('should return undefined because second arg is not a num', function () {
        expect(charLookUp("pesho", [])).to.equal(undefined, "It must return undefined")
    });
    it('should return undefined because two objects are not string and num', function () {
        expect(charLookUp([], {})).to.equal(undefined, "It must return undefined")
    });
    it('should return undefined because only one arg is called', function () {
        expect(charLookUp("tosho")).to.equal(undefined, "It must return undefined")
    });
    it('should return incorrect index because index rrg < 0 ', function () {
        expect(charLookUp("tosho", -1)).to.equal("Incorrect index", "It must return incorrect index")
    });
    it('should return incorrect index because index arg > string.length ', function () {
        expect(charLookUp("tosho", 25)).to.equal("Incorrect index", "It must return incorrect index")
    });

});