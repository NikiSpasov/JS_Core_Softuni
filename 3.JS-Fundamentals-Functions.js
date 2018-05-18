"use strict";

//1.Triangle of stars
// function printStars(num) {
//     for (let i = 1; i <= num; i++) {
//         console.log('*'.repeat(i));
//     }
//     for (var i = num - 1; i >= 0; i--) {
//         {
//             console.log('*'.repeat(i));
//         }
//     }
// }
//
//
// //02. Square of Stars
//
// function squareOfStars(num) {
//     function printStars(count = num) {
//         console.log('*' + ' *'.repeat(count - 1));
//     }
//
//     for (let n = 1; n <= num; n++) {
//         printStars();
//     }
// }
// //3. Palindrome
// function palindrome(word) {
//     let reversed = word.split('').reverse().join('');
//     return reversed === word ? true : false;
// }
//
// //4. DayOfWeel
// function dayOfWeek(day) {
//     let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
//         'Friday', 'Saturday', 'Sunday'];
//     console.log(daysOfWeek.indexOf(day) == -1 ? 'error' : daysOfWeek.indexOf(day) + 1);
// }
//
// //5. Functional Calculator
// function calc(num1, num2, op) {
//     let add = function (a, b) {
//         return a + b
//     };
//     let subtract = function (a, b) {
//         return a - b
//     };
//     let multiply = function (a, b) {
//         return a * b
//     };
//     let divide = function (a, b) {
//         return a / b
//     };
//
//     switch (op) {
//         case '*':
//             console.log(multiply(num1, num2));
//             break;
//         case '/':
//             console.log(divide(num1, num2));
//             break;
//         case '+':
//             console.log(add(num1, num2));
//             break;
//         case '-':
//             console.log(subtract(num1, num2));
//             break;
//         default:
//             console.log("Input error!");
//     }
// }
//
// //closure and IIFE /immediate invoked function expression
//
//
// //IIFE:
// //(function (x) {
// //    console.log(10 + x);
// //}(3)) //13
//
//
// //closure:
// //let closure = (function () {
// //    let x = 0;
// //    return function () {
// //        console.log(x++ + ' ' + x)
// //    }
// //})();
// //closure()//0 1
// //closure()//1 2
// //closure()//2 3
// //closure()//3 4
//
// //arrow (short function)
// // let a = (x, y) => (x + y);
// // console.log(a(5, 45)); //50
//
// //6. Aggregate Elements
// function aggregateElements(elements) {
//     aggregate(elements, 0, (a, b) => a + b);
//     aggregate(elements, 0, (a, b) => a + 1 / b);
//     aggregate(elements, '', (a, b) => a + b);
//
//     function aggregate(arr, initVal, func) {
//         let val = initVal;
//         for (let i = 0; i < arr.length; i++) {
//             val = func(val, arr[i]);
//         }
//         console.log(val);
//     }
// }

// 7. Words Uppercase

//["?", ".",","," "."!"]

function wordsToUppercase (words) {
    console.log(words
        .toUpperCase()
        .split(/[\W]/)
        .filter(x => x !== '')
        .join(", ")
    );
}

wordsToUppercase("Hi, how are you?");