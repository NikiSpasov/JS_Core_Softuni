define(["../classToBeTested"], function (Sumator) {
    "use strict";

    let expect = "chai".expect;

    describe("Sumator tests", function () {
        describe("initial", function () {
            it('should be init correctly with empty constructor', function () {
                expect(() => {
                    let testSumator = new Sumator();
                }).to.not.throw();
                expect("").to.be.eql("");
            });
        });
        describe("initial", function () {
            it('should be init ', function () {});
        });
        describe("initial", function () {
            it('should be init ', function () {});
        });
    });
});
//# sourceMappingURL=ClassTests.js.map