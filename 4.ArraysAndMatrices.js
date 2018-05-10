"use strict";

//01. Sum First Last
function sumFirstLast(arr) {
    console.log(Number(arr[0]) + Number(arr[arr.length - 1]));
}

//02. Even Position Elements
function evenPosElem(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        i % 2 === 0 ? result.push(arr[i]) : result = result;
    }
    console.log(result.filter(x => x =! "").join(' '));
}

//forEach:
// let beerArr = [];
// beerArr.push('Amstel', 'Zagorka', 'Kamenica', 'Ariana');
// beerArr.forEach((beer, index) => console.log(index + " " + beer));
// for (let beerArrElement of beerArr) {
//     console.log(beerArrElement);
// }

// let kasaBira = [["Retro", "Kamenica"], ["Zagorka", "Budvizer"]];
// for (let kasaBiraElement of kasaBira) {
//     kasaBiraElement.forEach((beer, index) => console.log(index + ". " + beer))
// }

//


//3. Negative / Positive Numbers
function negativePositiveElement (arr) {
    let arr1 = [];
    arr.forEach(e => e < 0 ? arr1.unshift(e) : arr1.push(e));
    arr1.forEach(el => console.log(el));
}

//4. First and Last K Numbers
function firstLastKNums (arr) {
    let countNums = arr[0];
    console.log(arr.slice(1, countNums + 1).join(' '));
    console.log(arr.slice(arr.length - countNums, arr.length).join(' '));
}

//5. Last K Numbers Sequence
function lastKNums (length, sequence) {
    let arrWithNums = [1];
    while (arrWithNums.length < length) {
        let result = 0;
        if (sequence >= arrWithNums.length) {
            let currentNum = arrWithNums.reduce ((acc, val) => {return acc + val});
            result += currentNum;
            arrWithNums.push(result);
        }
        else{
            for (let j = 1; j < sequence + 1; j++) {
                result += arrWithNums[arrWithNums.length - j];
            }
            arrWithNums.push(result);
        }
    }
    console.log(arrWithNums.join(' '));
}

//6. Process Odd Numbers

function processOddNums (arr) {
    //   let finalIndex = arr.length -1;
    //    let result = [];
    //    for (let i = finalIndex; i > 0; i--) {
    //        if (i % 2 !== 0) {
    //            let num = 2 * arr[i];
    //            result.push(num)
    //        }
    //    }
    // console.log(result.join(" "));

    console.log(
        (arr.filter((el, index) => index % 2 != 0))
        .map(e => e = 2 * e)
        .reverse()
        .join(" "))
}



//7. Smallest Two Numbers
function smallestTwoNumber (arr) {
    // console.log(arr.sort((a, b) => a - b)
    //     .filter((e, i) => i < 2)
    //     .join(" "));

    console.log(arr.sort((a, b) => a - b)
                   .slice(0, 2));
}

function biggestInMatrix (matrix) {
    let biggets = 0;
    for (let arr of matrix) {
        for (let num of arr) {
            if (num > biggets) {
                biggets = num
            }
        }
    }
    console.log(biggets);

    //printing matrices:
    console.log(matrix.map(r => r.join(" ")).join("\n"));
}
biggestInMatrix([[1, 2, 3, 4, 6], [5, 678, 4, 5]]);