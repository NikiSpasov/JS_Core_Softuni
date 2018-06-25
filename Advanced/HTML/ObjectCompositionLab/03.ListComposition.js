//object with closure to process list commands:
function solution(arrCom) {
    let commandProcessor = (() => {
        let list = [];
        return {
            add: (newItem) => list.push(newItem),
            remove: (item) => list = list.filter(e => e !== item),
            print: () => console.log(list.join(","))
        }
    })();
    for (let input of arrCom) {
        let [command, item] = input.split(" ");
        commandProcessor[command](item);
    }
};
solution(['add hello', 'add again', 'remove hello', 'add again', 'print']);