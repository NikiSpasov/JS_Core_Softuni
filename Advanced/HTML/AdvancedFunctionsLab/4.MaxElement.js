// //Call, apply and Bind demo:
// let maria = {
//     name: "Мария",
//     say: function (wordsTosay) {
//         return this.name + " said " + wordsTosay
//     }
// };
//
// let sashka = {
//     name: "Sashka",
//     say: function (wordsTosay) {
//         return this.name + " said " + wordsTosay
//     }
// };
//
// let ivan = {
//     name: "Ivan"
// };
//
// //console.log(maria.say("uuubreee"));
// //Мария said uuubreee
//
// //console.log(maria.say.call(ivan, "iiibree"));
// //Ivan said iiibree
//
// //console.log(maria.say.apply(ivan, ["iiiibreeee from .apply"]));
// //Ivan said iiiibreeee from .apply
//
//
//
// let helloIvan = sashka.say.bind(ivan, "ooopaaa"); //new function with other "this"/object
// console.log(helloIvan("ooopaaa"));
// //Ivan said ooopaaa
// console.log(sashka.say("i bre oroo"));
//
// //changing the other object with other this:
// sashka.say = sashka.say.bind(ivan);
// console.log(sashka.say("Now sashka is ivan"));
//Ivan said Now sashka is ivan

//console.log(helloIvan("this is binded"));
/*
!NB
DIFFERENCE between "call", "apply", "bind"
- in call arguments are coma separated.
- in apply the are passed in an array.
- call and apply are for one-time execution, calling object is the same

!NB  with "bind" we return new function with other object in a variable,
but we do not change the original object.
- wwe can change the original like this:
sashka.say = sashka.say.bind(ivan)

 */

//ver. 1:
// let giveMaxElement = arr => (function (arr) {
//     let result = arr.shift();
//     for (let nextElement of arr) {
//         let bigger = func(result, nextElement);
//         if (bigger) {
//             result = nextElement
//         }
//     }
//     console.log(result);
//
//     function func(firstElement, secondElement) {
//         return firstElement < secondElement;
//     }
// })(arr);
//
// //giveMaxElement([5, 12, 124, 3]);
//
// //ver. 2
// function largestNum (arr) {
//     let result = arr.shift();
//     for (let nextElement of arr) {
//         let bigger = func(result, nextElement);
//         if (bigger) {
//             result = nextElement;
//         }
//     }
//     console.log(result);
//     function func(firstElement, secondElement) {
//         return firstElement < secondElement;
//     }
// }
// //largestNum([10,20,5]);
//
// //ver.3
// function biggestNum (arrStr) {
//     return Math.max.call(null, ...arrStr);
// }

//biggestNum([1,2,3,4]);

//Closure:
   let test = (function () {
           let i = 0;
           return function () {
               i++;
               return i;
           };
       })();

for (let i = 0; i < 10; i++) {
    console.log(test());
}