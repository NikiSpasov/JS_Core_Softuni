function aggregate (arr) {

    console.log("Sum = " + arr.reduce((a,b) => a + b));
    console.log("Min = " + arr.reduce((a,b) => Math.min(a,b)));
    console.log("Max = " + arr.reduce((a,b) => Math.max(a,b)));
    console.log("Product = " + arr.reduce((a,b) => a * b));
    console.log("Join = " + arr.reduce((a,b) => "" + a + b));

}

function myCustomSumAllAggr (arr) {
    let result = arr.shift();
    for (let nextElement of arr) {
        result = func(result, nextElement)
    }
    return result;
    
    function func (firstElement, secondElement) {
        return firstElement + secondElement
    }
}

let a = myCustomSumAllAggr([1,2,3,45]);
console.log(a);