let result = (function fibonator(){
    let num1 = 0;
    let num2 = 1;
    function printNextFib () {
        let oldNum1 = num1;
        let oldNum2 = num2;
        num1 = oldNum2;
        num2 = oldNum1 + oldNum2;
        return num1;
    }
    return printNextFib;
})();
