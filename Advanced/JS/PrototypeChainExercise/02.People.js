function solve() {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error("Cannot instantiate abstract class")
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }

        work() {
            let currentTask = this.tasks.shift();
            console.log(this.name + currentTask);
            this.tasks.push(currentTask)
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }

        getSalary() {
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [
                " is working on a simple task."
            ];
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [
                " is working on a complicated task.",
                " is taking time off work.",
                " is supervising junior workers."
            ];
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            this.tasks = [
                " scheduled a meeting.",
                " is preparing a quarterly report.",
            ];
        }

        getSalary() {
            return this.salary + this.dividend;
        }
    }

    return {
        Employee: Employee,
        Manager: Manager,
        Senior: Senior,
        Junior: Junior
    }
}

let guy1 = new Junior('Peter', 27);
guy1.salary = 1200;
guy1.collectSalary();


console.log(guy3.hasOwnProperty(""));
dividend