function getPersons () {
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
    persons = [];
    let firstPerson = new Person('Maria', 'Petrova', 22, 'mp@yahoo.com');
    let secondPerson = new Person('SoftUni');
    let thirdPerson = new Person('Stephan', 'Nikolov', 25);
    let fourthPerson = new Person('Peter', 'Kolev', 24, 'ptr@gmail.com');
    persons.push(firstPerson);
    persons.push(secondPerson);
    persons.push(thirdPerson);
    persons.push(fourthPerson);
    return persons;
};

console.log(getPersons().join("\n"));