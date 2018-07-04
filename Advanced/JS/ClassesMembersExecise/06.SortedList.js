function getSortedList() {
    class SortedList {
        constructor(){
            this.array = [];
            this.size = 0;
        }
        add(num) {
            this.array.push(num);
            this.size++;
            return this.sort(this.array);
        };
        remove(index) {
            if (index > this.array.length - 1 || index < 0) {
                return this.array;
            }
            this.array.splice(index, 1);
            this.size--;
            return this.array;
        };
        get(index) {
            if (index < this.array.length - 1 && index >= 0) {
                return this.array[index];
            }
        };
        sort() {
            return this.array.sort((a, b) => a - b);
        }
    }
    return new SortedList();
}
let test = getSortedList();
//to see all methods/functions for a instance:
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(test))); //[ 'constructor', 'add', 'remove', 'get', 'sort' ]
console.log(test.__proto__); //SortedList {}