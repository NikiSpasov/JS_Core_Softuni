/* CALL, APPLY, BIND */
//
// let maria = {
//     name: "Maria",
//     age: 23,
//     town: "Sofia",
//     presentYourSelf:
//         function (thingILike) {
//         console.log(`I am ${this.name} from ${this.town} and i am ${this.age} years old and i like ${thingILike}`)}
// };
//
// let ivan = {
//     name: "Ivan",
//     age: 28,
//     town: "Pleven"
// };
//
// maria.presentYourSelf("skiing");
// //I am Maria from Sofia and i am 23 years old and i like skiing
//
// maria.presentYourSelf.call(ivan, "dating with nice girls"); //with call, we change the current this:
// //I am Ivan from Pleven and i am 28 years old and i like dating with nice girls
//
// //apply - the same with call, but the second arg is ALWAYS an ARRAY:
// maria.presentYourSelf.apply(ivan, ["f*** good..."])
// //I am Ivan from Pleven and i am 28 years old and i like f*** good...
//
//
// //bind:  we can save it in a variable and to call it later:
// let a  = maria.presentYourSelf.bind(ivan, "football");
// a();
//I am Ivan from Pleven and i am 28 years old and i like football


/* IIFE, CLOSURE */
// (function () {
//     console.log(1);
// })();
// //after you start the code, always program logs "1"
// let a = (function  () {
//     console.log(2);
// })();
// //even here, 2 i printed every time, because we call function with () at the end - no point to save it
// // in "a", we cant call a() on already called func;
// //
// // if we want to store this IIFE in a variable:
// a  = (function  () {
//     console.log(3);
// });
// a();
// //3

//Let's do the closure: (it is not necessary to be in a IIFE!)
let cnt = function () {
    let result = 0;
    return function (otherNum) { //this otherNum is argument for a()!!!
        console.log(++result); //this result is visible only here and it is static variable!
        console.log(otherNum + result);
    }
};
let a = cnt();

// //inner "result" is like static - class variable. It's state is preserved!
// a(1);//1 2
// a(2);//2 4
// a(3);//3 6
// a(4);//4 7, etc.
//
//
// //!!!!!!!NB!!!!!! if you don't call trough other variable, it does not work!!!:
// cnt()(1); //1, 2
// cnt()(2); //1, 3
// cnt()(3); //1, 4
// cnt()(4); //1, 5


// let test = (text) = function (text) {
//     console.log("Hello from test");
//     console.log(text);
// };
// test("Yo from the args!");
//Hello from test
//Yo from the args!


//Closure with object
let sequence = (function () {

    let currentNum = 0; //private!!!

    let obj= {};
    obj.getCurrent = function () {
         console.log(currentNum);
    };
    obj.increase = function () {
        console.log(++currentNum);
    };
    obj.decrease = function () {
        console.log(--currentNum);
    };

    return obj;
})();

// sequence.getCurrent();//0
// sequence.increase();//1
// sequence.increase();//2
// sequence.increase();//3
// sequence.decrease();//2
// sequence.getCurrent();//2

let nameOfTown = "Sofia";
let country = "Bulgaria";
let population = 9900;

let town = {nameOfTown, country, population};


//          !!!NB!!!
console.log(town);
//{ nameOfTown: 'Sofia', country: 'Bulgaria', population: 9900 }












