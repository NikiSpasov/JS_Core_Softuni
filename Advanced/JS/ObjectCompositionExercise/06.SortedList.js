function getSortedList() {
        let obj = {
        array: [],
        size: 0,
        add: function (num) {
            obj.array.push(num);
            obj.size++;
            return obj.sort(obj.array);

        },
        remove: function (index) {
            if (index > obj.array.length - 1 || index < 0) {
                return obj.array;
            }
            obj.array.splice(index, 1);
            obj.size--;
            return obj.array;
        },
        get: function (index) {
            if (index < obj.array.length - 1 || index >= 0) {
                return obj.array[index];
            }
        },
        sort: () => {
            arr = obj.array.sort((a, b) => a - b);
            return arr;
        }
    };
    return obj;
}


let sortedList = getSortedList();
sortedList.add(5);

let test = sortedList.get(0);
console.log(test);
sortedList.add(3);
console.log(sortedList.get(0));
sortedList.remove(0);
console.log(sortedList.get(0));
console.log(sortedList.size);


