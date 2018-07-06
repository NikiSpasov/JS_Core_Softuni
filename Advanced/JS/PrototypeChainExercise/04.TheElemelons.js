function solve () {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Can not instance abstract class")
            }
            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            let nameOnly = (this.constructor.name).slice(0, this.constructor.name.indexOf("melon"))
            return `Element: ${nameOnly}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elements = ["Water", "Fire", "Earth", "Air"];
        }

        morph() {
            let currentElement = this.elements.shift();
            this.elements.push(currentElement);
            return this;
        }

        toString() {
            return `Element: ${this.elements[0]}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }
    return {Melon, Melolemonmelon, Airmelon, Watermelon, Firemelon, Earthmelon};
}


let morphy = new Melolemonmelon(4, "goodMorphy");
console.log(morphy.toString());
morphy.morph()
console.log(morphy + "");