/**
 * Created by Nik on 08-May-18.
 */
"use strict";

//1.Multiply numbers
function multiplyNums (num1, num2){
        return num1 * num2;
    }

//2.	Boxes and Bottles
function calcBoxes (bottles, capacity){
    return Math.ceil(bottles / capacity);
}

//3. Leap Year
function leapYear (year){

    let leap = (year % 4 === 0 && year % 100 != 0) || year % 400 == 0;
    console.log(leap ? "yes" : "no");
    }

//4. Circle Area
function circleArea (radius){
    let area = Math.PI * Math.pow(radius, 2);
    console.log(area);
    console.log(Math.round(area * 100) / 100);
}

//5. Triangle Area
function triangleArea(a, b, c){
    let s = (a + b + c) / 2;
    let area = Math.sqrt(s * (s - a)*(s - b)*(s-c));
    console.log(area);
}

//6. Cone
function cone(radius, height){
    let volume = (Math.PI * radius ** 2 * height) / 3;
    let slantHeight = Math.sqrt(radius ** 2 + height ** 2);
    let lateralArea = Math.PI * radius * slantHeight;
    let surfaceArea = Math.PI * (radius ** 2);
    let totalArea = lateralArea + surfaceArea;

    console.log(`volume = ${volume}`);
    console.log(`area = ${totalArea}`);
}

//7. Odd / Even
function oddEven (num){
    let rem = num % 2;
    if (rem == 0){
        console.log("even");
    }
    else if (rem == Math.round(rem)){
        console.log("odd");
    }
    else console.log("invalid")
}

//8. Fruit or Vegetable
function fruitOtVeg(item){
    switch (item)
    {
        case 'banana':
        case 'apple':
        case 'kiwi':
        case 'cherry':
        case 'lemon':
        case 'peach':
        case 'grapes':

            console.log('fruit');
            break;

        case 'tomato':
        case 'cucumber':
        case 'pepper':
        case 'onion':
        case 'garlic':
        case 'parsley':
            console.log('vegetable');
            break;
        default:
            console.log('unknown');
    }
}

//9. Colorful Numbers
function colorNums (num){
    let result = '';
    result += '<ul>\n';
    for (let i = 1; i <= num; i++)
    {
        let color = i % 2 == 0 ? 'blue' : 'green';
        result += ` <li><span style='color:${color}'>${i}</span></li>\n`
    }
    result +='</ul>';
    console.log(result);
}

//10.	Chess Board
function draw(num){

    let result = "<div class=\"chessboard\">\n";
    for(let i = 1; i <= num; i++)
    {
        result += ' <div>\n';
        for (let a = 1; a <= num; a++){
            let color = (a + i) % 2 == 0 ? 'black' : 'white';
            result += `     <span class="${color}"></span>\n`;
        }
        result += ' </div>\n';
    }
    result += '</div>';
    console.log(result)
}
//11.	Binary Logarithm
function binaryLog (nums){
    for (let num in nums){
        console.log(Math.log2(nums[num]))
    }
}
//11.	Binary Logarithm(2)
function binaryLog2 (nums){
    for (let num of nums){
        console.log(Math.log2(num))
    }
}
//12. Prime Number Checker
function primeCheck (num){
    let isPrime = true;
    for (let n = 2; n < Math.sqrt(num); n++){
        if(num % n == 0){
            isPrime = false;
            break;
        }
    }
    console.log(num > 1 ? isPrime : false);
}