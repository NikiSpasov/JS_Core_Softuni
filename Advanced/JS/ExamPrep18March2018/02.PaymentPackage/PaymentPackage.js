let expect = require("chai").expect;

class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}

let testPackage = new PaymentPackage("Pesho", 10);
console.log(testPackage.toString());
testPackage.active = false;
console.log(testPackage.toString());

describe("PaymentPackage Tests", function () {

    it('should be right name', function () {
        let testPackage = new PaymentPackage("testName", 10);
        testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.name === "testName").to.be.eq(true);
    });
    it('should be right value', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.value).to.be.eq(10);
    });
    it('should return true active by default', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.active).to.be.eq(true)
    });
    it('should return 20 VAT by default', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.VAT).to.be.eq(20)
    });
    it('should be positive value num after init', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.value = -1).to.throw(Error)
    });
    it('should be positive value num upon init', function () {
        expect(() => {
            let test = new PaymentPackage("ee", -1)
        }).to.throw(Error)
    });
    it('value should be number', function () {
        expect(() => {
            let test = new PaymentPackage("ee", {})
        }).to.throw(Error)
    });
    it('value should be number', function () {
        expect(() => {
            let test = new PaymentPackage("")
        }).to.throw(Error)
    });
    it('value should be number', function () {
        expect(() => {
            let test = new PaymentPackage("ee", [])
        }).to.throw(Error)
    });
    it('value should be number', function () {
        expect(() => {
            let test = new PaymentPackage("ee", "")
        }).to.throw(Error)
    });
    it('value should be number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            let test = new PaymentPackage("ee", "ddd")
        }).to.throw(Error)
    });
    it('value should be number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            let test = new PaymentPackage("ee", () => {})}).to.throw(Error)
    });
    it('throw control error', function () {
        expect(() =>
                { let testPackage = new PaymentPackage("testName");}).to.throw(Error)
        });
    it('throw cosr error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage(); }).to.throw(Error)
    });
    it('throw cor error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage(8);}).to.throw(Error)
    });
    it('throw cssr error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage(null);}).to.throw(Error)
    });
    it('throw ontssr error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage(undefined);}).to.throw(Error)
    });
    it('throw con error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage({});}).to.throw(Error)
    });
    it('throw contssrrrr error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage([]);}).to.throw(Error)
    });
    it('throw contssrr error', function () {
        expect(() =>
        { let testPackage = new PaymentPackage(()=>{});}).to.throw(Error)
    });

    it('should be string with at least one char after init', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.name = "").to.throw(Error)
    });
    it('should be string with at least one char upon init', function () {
        expect(() => {
            let test = new PaymentPackage("", 1)
        }).to.throw(Error)
    });
    it('name shoiuld be a string', function () {
        expect(() => {
            let test = new PaymentPackage({}, 1)
        }).to.throw(Error)
    });
    it('name shoiuld be a string', function () {
        expect(() => {
            let test = new PaymentPackage([], 1)
        }).to.throw(Error)
    });
    it('name shoiuld be a string', function () {
        expect(() => {
            let test = new PaymentPackage(34, 1)
        }).to.throw(Error)
    });
    it('name shoiuld be a string', function () {
        expect(() => {
            let test = new PaymentPackage(() => {
            }, 1)
        }).to.throw(Error)
    });
    it('name shoiuld be a string', function () {
        expect(() => {
            let test = new PaymentPackage([{}, {}], 1)
        }).to.throw(Error)
    });
    it('should active to be a boolean', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.active = "").to.throw(Error)
    });
    it('should active to be a boolean', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.active = 1).to.throw(Error)
    });
    it('should active to be a boolean', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.active = {}).to.throw(Error)
    });
    it('should active to be a boolean', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.active = []).to.throw(Error)
    });
    it('should active to be a boolean', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => testPackage.active = () => {
        }).to.throw(Error)
    });
    it('VAT should be a number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = ""
        }).to.throw(Error);
    });
    it('VAT should be a number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = {}
        }).to.throw(Error);
    });
    it('VAT should be a number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = []
        }).to.throw(Error);
    });
    it('VAT should be a number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = "aaa"
        }).to.throw(Error);
    });
    it('VAT should be a number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = () => {
            }
        }).to.throw(Error);
    });
    it('VAT should be a number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = [{}, {}]
        }).to.throw(Error);
    });
    it('VAT should be a positive number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = -6
        }).to.throw(Error);
    });
    it('VAT should be a positive number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = -1
        }).to.throw(Error);
    });
    it('VAT should be a positive number', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(() => {
            testPackage.VAT = -0.1
        }).to.throw(Error);
    });
    it('should change VAT', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.VAT).to.be.eq(20);
        testPackage.VAT = 19;
        expect(testPackage.VAT).to.be.eq(19);
    });
    it('should change active', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.active).to.be.eq(true);
        testPackage.active = false;
        expect(testPackage.active).to.be.eq(false);
    });
    it('should not return inactive if active is true', function () {
        let testPackage = new PaymentPackage("testName", 10);
        expect(testPackage.toString().indexOf("inactive")).to.be.lt(0);
    });
    it('should return inactive if active is false', function () {
        let testPackage = new PaymentPackage("testName", 10);
        testPackage.active = false;
        expect(testPackage.toString().indexOf("inactive")).to.be.gt(0);
    });
    it('should not return the same if active is true', function () {
        let testPackage = new PaymentPackage("testName", 10);
        let a = testPackage.toString();
        testPackage.active = false;
        let b = testPackage.toString();
        expect(a).to.be.not.eq(b);
    });
});