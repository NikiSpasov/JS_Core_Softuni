function commandProcessor (arrStr) {
    (function () {
        let result = "";

        for (let token of arrStr) {
            let [command, arg] = token.split(" ");
            switch (command){
                case "print":
                    console.log(result);
                    break;
                case "append":
                    result += "" + arg;
                    break;
                case "removeStart":
                    arg = Number(arg);
                    result = result.substr(arg, result.length);
                    break;
                case "removeEnd":
                    arg = Number(arg);
                    result = result.substr(0, result.length - arg);
            }
        }
    }(arrStr))
}
commandProcessor(['append 123',
    'append 45',
    'removeStart 2',
    'removeEnd 1',
    'print']
);