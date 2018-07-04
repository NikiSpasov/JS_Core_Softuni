class Circle {
    constructor (radius){
        this.radius = radius;
    }

    get diameter() {
        return Number(this.radius * 2);
    }

    set diameter(diameter) {
        this.radius = diameter / 2;
    }

    get area() {
        return Number(Math.PI * this.radius * this.radius);
    }
}