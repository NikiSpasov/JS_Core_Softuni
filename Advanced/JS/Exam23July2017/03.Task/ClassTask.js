class Task {
    constructor(title, deadLine) {
        this.title = title;
        this.deadline = deadLine;
        this.status;
        this.isOverdue;
    }

    get status(){
        return this._status;
    }
    set status(val){
        this._status = val;
    }

    get deadline (){
        return this._deadLine;
    }

    set deadline (val){
        let now = Date.now();
        if (val < now) {
            throw new Error("The deadLine must be after today")
        }
        this._deadLine = val;
        this.status = "Open";
    }

    get isOverdue(){
        let now = Date.now();
        return this.status !== "Completed" && this.deadLine < now;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    static comparator(a, b) {
        if (Task.statusRank === undefined) {
            Object.defineProperty(Task, 'statusRank', {
                value: {
                    'Open': 2,
                    'In Progress': 1,
                    'Complete': 3
                },
                configurable: false,
                enumerable: false,
                writable: false
            });
        }
        let rankA = a.isOverdue ? 0 : Task.statusRank[a.status];
        let rankB = b.isOverdue ? 0 : Task.statusRank[b.status];
        if (rankA - rankB !== 0) {
            return rankA - rankB;
        }
        return a.deadline - b.deadline;
    }

    getIcon() {

        if (this.isOverdue) {
            return "\u26A0";
        }
        switch (this.status) {
            case "Open":
                return "\u2731";
            case "In Progress":
                return "\u219D";
            case "Complete":
                return "\u2714";
        }
    }

    toString() {
        if (this.status === "Complete") {
            return `[${this.getIcon()}] ${this.title}`
        } else if (this.isOverdue) {
            return `[${this.getIcon()}] ${this.title} (overdue)`
        }
        return `[${this.getIcon()}] ${this.title} (deadline: ${this.deadLine})`
    }
}


let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
//console.log(task1 + '\n' + task2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
// setTimeout(() => {
//     tasks.sort(Task.comparator);
//     console.log(tasks.join('\n'));
// }, 1000); // Sort and print one second later
//
// should throw an Error
//let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
// // should throw an Error
//task1.deadline = new Date(2005, '4', '20');
console.log(tasks.join('\n'));
