let solution = (() => {
    return {
        "add": (a, b) => [a[0] + b[0], a[1] + b[1]],
        "multiply": (a, num) => [a[0] * num, a[1] * num],
        "length": (arrNum) => Math.sqrt(arrNum[0] * arrNum[0] + arrNum[1] * arrNum[1]),
        "dot": (a, b) => a[0] * b[0] + a[1] * b[1],
        "cross": (a, b) => a[0] * b[1] - a[1] * b[0]
    }
})();

console.log(solution.cross([3, 7], [1, 0]));