function result () {
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
//
// let teacher = new Teacher('U4itelo', 'pesho@pesho.com', "History");
// let person = new Person('Pesho', 'pesho@pesho.com');
// let student = new Student('Ginka Studento', 'ggg@gmail.com', "PHP");
// console.log(person + "");
// console.log(teacher + "");
// console.log(student + "");

    return {Person, Teacher, Student}
}