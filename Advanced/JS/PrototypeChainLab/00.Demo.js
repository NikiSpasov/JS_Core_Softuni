class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    toString() {
        let result = this.constructor.name + " ";
        result += "(";
        for (let i = 0; i < Object.keys(this).length; i++) {
            result += `${Object.keys(this)[i]}: ${this[Object.keys(this)[i]]}`
            if (i < Object.keys(this).length - 1) {
                result += ", "
            }
        }
        result += ")";
        return result;
    }

    saySomething() {
        console.log(this.name + " said my e-mail is " + this.email);
    }
}

class Teacher extends Person {
    constructor(name, email, subject) {
        super(name, email);
        this.subject = subject;
    }
}

class Student extends Person {
    constructor(name, email, course) {
        super(name, email);
        this.course = course;
    }
}

let person = new Person("Gosho", "g@gmail.com");
let teacher = new Teacher("daskal Nino", "n@yahoo.com", "history");
teacher.teach = function tEACh() {
    return "I'm teaching"
};
console.log(teacher.teach());//I'm teaching

let student = new Student("Pesho studenta", "peshooo@pe.com", "history");
// person.saySomething();
// teacher.saySomething();
// student.saySomething();

console.log(Object.getOwnPropertyNames(person));//[ 'name', 'email' ]

console.log(Object.getOwnPropertyNames(Teacher));//[ 'length', 'prototype', 'name' ]

console.log(Teacher.prototype);//Teacher {}

console.log(Object.getPrototypeOf(Teacher));//[Function: Person]

console.log(Person.prototype.saySomething);//[Function: saySomething]

console.log(Object.getPrototypeOf(teacher) === Teacher.prototype);//true

console.log(teacher.prototype);//NO NO NO!!!! undefined

console.log(teacher.__proto__);//Teacher {}

console.log(Object.getPrototypeOf(teacher));//Teacher {} - the same! Official way

console.log(Object.getPrototypeOf(Object.getPrototypeOf(teacher)));//Person {}
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(teacher))));//{}
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(teacher)))));// null


//  How to CREATE "ABSTRACT CLASS":

class Car {
    constructor() {
        if (new.target === Car) {
            throw new TypeError("This is abstract, can not be instanced")
        }
    }
}
//let testCar = new Car(""); //BAM


//         MIXIN:
function Mixin () {
    this.extensionFunc = function () {

    };
    return this;
}

//real MIXIN:

function asCircle () {
    this.area = function () {
        return Math.PI * this.radius * this.radius;
    };
    return this;
}

class Circle {
    constructor(r){
        this.radius = r;
    }
}

asCircle.call(Circle.prototype); //same as Circle.prototype.area =  function () { return Math.PI......



let testCircle  = new Circle(3);

//you can attach it to the instance:
//asCircle.call(testCircle)

console.log(testCircle.area());

