class Rat {
    constructor(name){
        this.name = name;
        this.unitedRats = [];
    }
    unite(otherRat){
        if (otherRat instanceof(Rat)) {
            this.unitedRats.push(otherRat);
        }

    }
    getRats() {
        return this.unitedRats;
    }
    toString(){
        let result = "";
        result += this.name + "\n";
        result += this.unitedRats.map(r => "##" + r.name).join("\n");
        return result;
    }
}

let testRat = new Rat("Gosho pluho");
let otherRat = new Rat("Ginka Mishoko");
let otherRat2 = new Rat("Ginka Mishoko - sestra i");

testRat.unite(otherRat);
testRat.unite(otherRat2);

console.log(testRat + "");
console.log(testRat.getRats());
