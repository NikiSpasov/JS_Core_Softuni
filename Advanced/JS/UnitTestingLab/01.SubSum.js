function sumArray (arr, startIndex, endIndex) {
    try {
        if (startIndex < 0) {
            startIndex = 0;
        }
        if (endIndex > arr.length - 1) {
            endIndex = arr.length - 1;
        }
        if (arr.length === 0) {
            return 0;
        }
        return arr.splice(startIndex, endIndex + 1).map(n => Number(n)).reduce((a,b) => a+b)
    }
    catch (e) {
        return NaN;
    }
}

console.log(sumArray("\"\"", 0, 2));