//Partial Application
//Implementation of ++:

// let sumNums = (a, b) => a + b;
//
// //higher order function - returns function
// let plusPlus  = a => sumNums(1, a);
//
// console.log(plusPlus(1)); //2

function formatCurrency (seprator, symbol, symbolFirst, value) {
    let finalResult;
    let result = Math.trunc(value) + seprator;
    result += value.toFixed(2).substr(-2, 2);
    symbolFirst ? finalResult = (symbol + " " + result)
    : finalResult = (result + " " + symbol);
    return finalResult;
}

let formatter = getDollarFormater(formatCurrency);

function getDollarFormater (formatter) {
    function dollarFormatter(value) {
        return formatter(",", "$", true, value)
    }
    return dollarFormatter;
}

console.log(formatter(2.709));