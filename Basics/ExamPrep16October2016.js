"use strict";

//01. Arithmephile
function calc(arrStr) {

    arrStr.map(x => Number(x));

    let resultMax = -10000000;
    let result = 0;

    for (let index in arrStr) {
        let currentIndex = Number(index);
        if (arrStr[currentIndex] > 0 && arrStr[currentIndex] < 10) {
            let test = currentIndex + Number(arrStr[currentIndex]);
            if ((currentIndex === arrStr.length - 1) || (test > arrStr.length - 1)) {
                continue;
            }

            let arrToMultiply = arrStr.slice((currentIndex + 1), (currentIndex + 1 + Number(arrStr[currentIndex])));
            result = arrToMultiply.reduce((a, b) => a * b);
            if (result > resultMax) {
                resultMax = result;
            }
        }
    }
    console.log(resultMax);
}

calc(["9",
      "5652",
      "5652",
      "9190",
      "4172",
      "494",
      "536",
      "9510",
      "1584",
      "0",
      "1",
      "10",
      "6",
      "0",
      "675",
      "8913",
      "1891",
      "4298",
      "269",
      "3754",
      "6459"
]);