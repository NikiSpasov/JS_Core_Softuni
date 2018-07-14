let expect = require("chai").expect;

class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for(let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for(let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
}

describe("StringBuilder Test", function () {

    //init

    let stringer;
    beforeEach(function () {
        stringer = new StringBuilder("abcd")
    });
    it('should instanced normally', function () {
        expect(()=> {let stringer2 = new StringBuilder("123")}).to.not.throw(Error);
    });
    it('should return the same string when it has input', function () {
        expect(stringer.toString()).to.be.eq("abcd")
    });
    it('should return the empty string when it is instanced with empty input', function () {
        let stringer2 = new StringBuilder();
        expect(stringer2.toString()).to.be.eq("");
    });
    it('should return empty string when it has not input', function () {
        stringer._stringArray = [];
        expect(stringer.toString()).to.be.eq("")
    });
    it('should return the same string when it has input', function () {
        let stringer2 = new StringBuilder("a b c d");
        expect(stringer2.toString()).to.be.eq("a b c d")
    });

    //init with error input
    it('should return the same string when it has input', function () {
        expect(() => {let stringer2 = new StringBuilder(123)}).to.throw("Argument must be string");
    });
    it('should return the same string when it has input', function () {
        expect(() => {let stringer2 = new StringBuilder([])}).to.throw("Argument must be string");
    });
    it('should return the same string when it has input', function () {
        expect(() => {let stringer2 = new StringBuilder({})}).to.throw("Argument must be string");
    });
    it('should return the same string when it has input', function () {
        expect(() => {let stringer2 = new StringBuilder(() => {})}).to.throw("Argument must be string");
    });
    it('should return the same string when it has input', function () {
        expect(() => {let stringer2 = new StringBuilder(null)}).to.throw("Argument must be string");
    });
    //special case!
    it('should return the same string when it has input', function () {
        expect(() => {let stringer2 = new StringBuilder(undefined)}).to.not.throw("Argument must be string");
    });

    //append:
    it('should append correctly', function () {
        stringer.append("1234");
        expect(stringer.toString()).to.be.eq("abcd1234");
    });
    //append error:
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.append(11)).to.throw(TypeError);
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.append({})).to.throw(TypeError); //with ()?
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.append([])).to.throw(TypeError);
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.append(()=> {})).to.throw(TypeError);
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.append(null)).to.throw(TypeError);
    });
    //prepend error:
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.prepend(11)).to.throw(TypeError);
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.prepend({})).to.throw(TypeError); //with ()?
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.prepend([])).to.throw(TypeError);
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.prepend(()=> {})).to.throw(TypeError);
    });
    it('should throw error', function () {
        stringer.append("1234");
        expect(()=> stringer.prepend(null)).to.throw(TypeError);
    });
    //prepend normal:
    it('should prepend correctly', function () {
        stringer.prepend("1234");
        expect(stringer.toString()).to.be.eq("1234abcd");
    });

    //insertAt normal:
    it('should insert correctly', function () {
        stringer.insertAt("1234", 1);
        expect(stringer.toString()).to.be.eq("a1234bcd");
    });
    //insertAt error:
    it('should throw Typerror', function () {
        expect(()=> stringer.insertAt({}, 1)).to.throw(TypeError);
    });
    it('should throw Typerror', function () {
        expect(()=> stringer.insertAt(1, 1)).to.throw(TypeError);
    });
    it('should throw Typerror', function () {
        expect(()=> stringer.insertAt([], 1)).to.throw(TypeError);
    });
    it('should throw Typerror correctly', function () {
        expect(()=> stringer.insertAt(()=>{return ""}, 1)).to.throw(TypeError);
    });


    //remove normal:
    it('should remove correctly', function () {
        stringer.remove(0, 1);
        expect(stringer.toString()).to.be.eq("bcd");
    });
    it('should remove 3 elements', function () {
        stringer.remove(0, 2);
        expect(stringer.toString()).to.be.eq("cd");
    });
    //undefined
    it('should be undefined', function () {
        expect(stringer.remove("qwer", "ww")).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove("", "ww")).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove(1, "ww")).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove("qwer", 3)).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove([], "ww")).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove("qwer", [])).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove({}, [])).to.be.eq(undefined)
    });
    it('should be undefined', function () {
        expect(stringer.remove(2, {})).to.be.eq(undefined)
    });
});

