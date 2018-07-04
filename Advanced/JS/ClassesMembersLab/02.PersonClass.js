class Person {
    constructor(firstName, lastNamse, age, email) {
        this.firstName = firstName;
        this.lastName = lastNamse
        this.age = age;
        this.email = email;
    }
    toString() {
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;
    }
}
let p = new Person("Peter", "Marinov", 18, "pesho18@abv.bg");
console.log(p.toString());
