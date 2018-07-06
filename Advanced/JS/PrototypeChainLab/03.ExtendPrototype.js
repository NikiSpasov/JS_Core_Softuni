
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    toString() {
        let result = this.constructor.name + " ";
        result += "(";
        for (let i = 0; i < Object.keys(this).length; i++) {
            result += `${Object.keys(this)[i]}: ${this[Object.keys(this)[i]]}`;
            if (i < Object.keys(this).length - 1) {
                result += ", "
            }
        }
        result += ")";
        return result;
    }
}

function extendClass (classToExtend) {

    classToExtend.prototype.species = "Human";
    classToExtend.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ` + this.toString();
    };
    return classToExtend;
}

let Extended = extendClass(Person);
let p = new Extended("Pesho", "emai@hit.bg");

console.log(Extended);
console.log(p.species);
console.log(p.toSpeciesString());