function result() {

    class Figure {
        constructor(area){
            if (new.target === Figure) {
                throw new Error("Can not instance abstract class")
            }
        }

        get area(){
            return this._area;
        }

        set area(value){
            this._area = value;
        }

        toString(){
            let result = this.constructor.name + " - ";
            let props = Object.getOwnPropertyNames(this);
            result += props.map(p => `${p}: ${this[p]}`).join(", ")
            return result
        }
    }

    class Circle extends Figure {
        constructor(radius){
            super();
            this.radius = radius;

        }

        get area(){
            return Math.PI * this.radius * this.radius;
        }
    }

    class Rectangle extends Figure{
        constructor(width, height){
            super();
            this.width = width;
            this.height = height;
        }

        get area(){
            return this.width * this.height;
        }
    }
    
    return {Figure, Circle, Rectangle}
}

result();

