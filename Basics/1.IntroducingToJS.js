'use strict';


//1. Sum 3 Numbers

function sumNumbers(a, b, c) {
    let d = Number(a);
    let e = Number(b);
    let f = Number(c);

    let sum = d + e + f;
    console.log(sum);
}

//2. Calculate Sum and VAT

function calcVAT(input) {
    let sum = 0;
    for (let number of input) {
        sum += number;
    }

    console.log('sum = ' + sum);
    console.log('VAT = ' + sum * 0.2);
    console.log('total: ' + (sum + (sum * 0.2)));
}


//3. Letter Occurences In String

function letterOccurencesInString(word, letter) {
    let counter = 0;
    for (let a of word) {
        if (a === letter) {
            counter++
        }
    }
    console.log(counter);
}

//4. Filter By Age

function filterByAge(minAge, nameA, ageA, nameB, ageB) {
    let personA = {name: nameA, age: ageA};
    let personB = {name: nameB, age: ageB};
    if (personA.age >= minAge) console.log(personA);
    if (personB.age >= minAge) console.log(personB);
}

//5. String of Numbers 1..N

function numberToN(number) {
    let result = '';
    for (let a = 1; a <= number; a++) {
        result += a;
    }
    console.log(result)
}


//6. Figure Area
function figArea(w, h, W, H) {
    let [s1, s2, s3] = [w * h, W * H, Math.min(w, W) * Math.min(h, H)];
    return s1 + s2 - s3;
}

//7. Next Day
function nextDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    let oneDay = 24 * 60 * 60 * 1000;
    let nextDate = new Date(date.getTime() + oneDay);
    return nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) +
        '-' + nextDate.getDate();
}

//8. Distance between Points
function distanceBetweenPoints(x1, y1, x2, y2) {
    let pointA = {x: x1, y: y1};
    let pointB = {x: x2, y: y2};

    let distanceX = Math.pow(pointA.x - pointB.x, 2);
    let distanceY = Math.pow(pointA.y - pointB.y, 2);

    return Math.sqrt(distanceX + distanceY);
}

//9.Some test
function testFun(a, b) {

    (() => {
        console.log("Hello from self-executing func!" + a + b)
    })();
}

testFun(111, 222);