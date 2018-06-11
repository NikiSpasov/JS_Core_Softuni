"use strict";


//1. Print letters
function printWordInLetters (str) {
    for (let strKey in str) {
        console.log(`str[${strKey}] -> ${str[strKey]}`);
    }
}

//2. ConcatAndReverse
function concatAndReverse (arr) {
    let stringFromArr = arr.join("");
    let charArray = Array.from(stringFromArr);
    charArray.reverse();
    return charArray.join("");
}

//! Strings are IMMUTABLE:
let str = "Gosho is cool dude, really cool dude!";
//str[0] = "D"; // in strict mode:
// TypeError: Cannot assign to read only property '0' of string 'Gosho';
//WARNING - if it is not in strict mode, it will not blow, but it will be still "Gosho..."
//console.log(str); //it's still "Gosho...";

//Methods:

let indexOfCool = str.indexOf("cool"); 
//console.log(indexOfCool); //9

let substring = str.substr(9, 4); //first argument is from witch index, second - length
//console.log(substring);//cool

let otherSubstring = str.substring(9, 13);//first argument is from with index,
                                        //but second one is TO WITCH index, NOT the length
//console.log(otherSubstring); //cool

let replacedStr = str.replace("dude", "boy");
//console.log(replacedStr);//Gosho is cool boy, really cool dude!
                        //warning! this way it replace ONLY FIRST appearance!

//console.log(str.replace(/dude/g, "boy"));//replace ALL occurrences /g is for GLOBAL from Regex!
//Gosho is cool boy, really cool boy!

//3. Count Occurrences

function countOccurences (target, text) {
    let startIndex = 0;
    let cnt = 0;
    while(true)
    {
        let index = text.indexOf(target, startIndex);
        if (index < 0) {
            break;
        }
        else{
            startIndex = index + 1;
            cnt++;
        }
    }
    console.log(cnt);

}

//4. Extract Text
function extractText (text) {
    let startIndex = 0;
    let arrOfstrings = [];
    while (true) {
        let firstPindex = text.indexOf('(', startIndex);
        let lastPIndex = text.indexOf(')', startIndex);
        if (firstPindex < 0 || lastPIndex < 0 || firstPindex > lastPIndex) break;
        arrOfstrings.push(text.substring(firstPindex + 1, lastPIndex));
        startIndex = lastPIndex + 1;
    }
    console.log(arrOfstrings.join(", "));
}

//     let result = [];
//
//     let startIndex = text.indexOf('(');
//
//     while (startIndex > -1) {
//         let endIndex = text.indexOf(')', startIndex);
//         if (endIndex === -1){
//             break;
//         }
//         let snippet = text.substring(startIndex + 1, endIndex);
//         result.push(snippet);
//         startIndex = text.indexOf('(', endIndex);
//     }
//     console.log(result.join(', '));
// }

//5. Aggregate Table
function aggregateTable (arr) {
    let towns = [];
    let incomes = 0;
    for (let pair of arr) {
        let currentArr = pair.split(/\s*\|/)
                             .filter(str => str !== "");
        towns.push(currentArr[0].trim());
        incomes += Number(currentArr[1].trim());
    }
    console.log(towns.join(', '));
    console.log(incomes);
}

//6. Restaurant Bill
function restaurantBill (bill) {
    // let result = [];
    // let totalBill = 0;
    // for (let i = 0; i < bill.length; i++) {
    //     if (i % 2 === 0) {
    //         result.push(bill[i].trim())
    //     }
    //     else {
    //         totalBill += Number(bill[i].trim())
    //     }
    // }
    // console.log(`You purchased ${result.join(", ")} for a total sum of ${totalBill}`);

    // Version 2:
    let products = bill
        .filter((item, index) => index % 2 === 0)
        .join(', ');
    let totalBill = bill
        .filter((item, index) => index % 2 !== 0)
        .map(n => Number(n))
        .reduce((a, b) => a+b);
    console.log(`You purchased ${products} for a total sum of ${totalBill}`);
}

//07. Usernames
function extractUserNameByEmail (emails) {
    let result = [];
    for (let email of emails) {
        let name = email.substring(0, email.indexOf("@"));
        let otherChars = email.substring(email.indexOf("@") + 1)
            .split(".")
            .map(s => s[0])
            .join('');
        result.push(name.concat(".").concat(otherChars))
    }
    console.log(result.join(", "));
}

//8. Censorship
function censor (text, arrOfBannedWords) {

    // arrOfBannedWords.forEach(word => {
    //         let regex = new RegExp(word,"g");
    //         text = text.replace(regex, new Array(word.length + 1).join("-"))});
    // console.log(text);
    
    //Version 2:
    for (let word of arrOfBannedWords) {
        let regex = new RegExp(word, "g");
        let dashes = "*".repeat(word.length);
        text = text.replace(regex, dashes)
    }
    console.log(text);

    //Version 3:
    for (let current of arrOfBannedWords) {
        let replaced = '-'.repeat(current.length);
        while (text.indexOf(current) > -1) {
            text = text.replace(current, replaced);
        }
    }
    return text;
}

//09. Escaping
function escaping (arr) {
    let result = "<ul>\n";
    for (let arrElement of arr) {
        result += "   <li>" + escapeChars(arrElement) + "</li>\n"
    }
    result += "</ul>";
    console.log(result);

    function escapeChars (str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

//Some RegEx:

//let pattern = /[a-z]+/;

//console.log(pattern.test("asdgf")); //returns true - this is for test



//10. Match All Words
function matchAllWords (str) {
    let reg = new RegExp(/\w+/, "g");
    console.log(str.match(reg).join('|'));
}

//11. Email validation
function emailValidation (str) {
    let pattern = /^[A-Za-z\d]+@[a-z]+\.[a-z]+$/;
    console.log(pattern.test(str) ? "Valid" : "Invalid");
}

//12. *Expression Split
function expressionSplit (str) {
    let pattern = "[^\\\\\\s\\(\\)\\'\\,\\;\\.]+";
    let reg = new RegExp(pattern, "g");
    let result = str.match(reg);
    console.log(result.join("\n"));


    //ver.2
    let elements = str
        .split(/[\s.();,]+/);
    console.log(elements.join("\n"));

}

//13. Match the Dates
function matchTheDate (str) {
    // let pattern = /\b\d{1,2}-[A-Z]{1}[a-z]{2}-\d{4}/;
    // let reg = new RegExp(pattern, "g");
    // let result = str.match(reg);
    //
    // for (let resultElement of result) {
    //     let tokens = resultElement.split("-");
    //     console.log(
    //         `${resultElement} (Day: ${tokens[0]}, Month: ${tokens[1]}, Year: ${tokens[2]})`
    //     );
    // }

    //ver. 2 - with GROUPING - see the parenthesis below:
    // let pattern =
    //     /\b([0-9]{1,2})-([A-Z][a-z]{2})-([0-9]{4})\b/g;
    // let dates = [], match;
    //     while (match = pattern.exec(str)){
    //         dates.push(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`)
    //     };
    // console.log(dates.join("\n"));


    //ver. 3
    let pattern =
        /\b([0-9]{1,2})-([A-Z][a-z]{2})-([0-9]{4})\b/g;
    let match = pattern.exec(str);
    while (match){
        console.log
        (`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`);
        match = pattern.exec(str);
    }
}

//14. Parse the Employee Data
function parseEmplData (str) {
    // let pattern = /^([A-Z][a-z]+) - ([\d]+) - ([\s\w\d_-]+?)$/gm;
    // let match = pattern.exec(str);
    // while (match){
    //     console.log(`Name: ${match[1]}\nPosition: ${match[2]}\nSalary: ${match[3]}\n`);
    //     match = pattern.exec(str)
    // }

    // let pattern = /^([A-Z][a-z]+) - ([\d]+) - ([\s\w\d_-]+?)$/gm;
    //
    // for (let token of str) {
    //     let match = pattern.exec(token);
    //     if (match === null) {
    //         continue;
    //     }
    //     console.log(`Name: ${match[1]}\nPosition: ${match[3]}\nSalary: ${match[2]}\n`);
    // }

    //var 3:

        let regex =
            /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([a-zA-Z0-9 -]+)$/;
        for (let element of str) {
            let match = regex.exec(element);
            if (match)
                console.log(`Name: ${match[1]}\n` +
                    `Position: ${match[3]}\n` +
                    `Salary: ${match[2]} `);
        }
}


//15. Form Filler

function formFiller (n, e, num, textArr) {
    let name = n;
    let email = e;
    let telNum = num;

    let result = "";


    let patternName = /<![a-zA-Z]+!>/g;
    let patternEmail = /<@[a-zA-Z]+@>/g;
    let patternTel = /<\+[a-zA-Z]+\+>/g;

    textArr.forEach(line => {
    line = line.replace(patternName, name);
    line = line.replace(patternEmail, email);
    line = line.replace(patternTel, telNum);
    console.log(line)});
}

//16. *Match Multiplication

function matchMuliplications (str) {

    // let patternForNums = /(-?\d+\s*)\*\s*(-*\d+\.*\d+)/;
    // //let match = str.match(patternForNums);
    // let match = patternForNums.exec(str);
    // while (match){
    //     let result = match[1] * match[2];
    //     str = str.replace(patternForNums, result);
    //     match = patternForNums.exec(str);
    // }
    // console.log(str);
    
    //ver 2 - with CALLBACK
    
    // let patternForNums = /(-?\d+\s*)\*\s*(-*\d+\.*\d+)/g;
    // str = str.replace(patternForNums, function (match, group1, group2) {
    //     return group1 * group2;
    // });
    // console.log(str);
    //
    //ver 2.1
    function performMultiplications(text) {
        text = text.replace(/(-?\d+)\s*\*\s*(-?\d+(\.\d+)?)/g,
            (match, num1, num2) => Number(num1) * Number(num2));
        console.log(text);
    }

}

//Replacing with groups:
function replaceGroup () {
    let str = 'Visit <link>http://fb.com</link> or <link>http://softuni.bg</link>.';
    str = str.replace(/<link>(.*?)<\/link>/g,
        '<a href="$1">Link</a>');
    console.log(str);
    //Visit <a href="http://fb.com">Link</a> or <a href="http://softuni.bg">Link</a>.
}

//REGEX RECAP:
//To create a RegExp with an object literal:
// let regex = /ab+c/ig;
// To create a RegExp with a constructor:
// let regex = new RegExp(/ab+c/, 'ig');
// let regex = new RegExp('ab+c', 'ig');

// To get the matched text and sub groups (use in a loop):
// regex.exec(str);
// [match, group1, group2, …]

//To get all matched strings (use with global flag):
//str.match(regex);
// [match1, match2, …]

//To validate string (use with anchors):
// regex.test(str);

//functional replace
// str.replace(regex, function);
// params: match, [p1, p2, …] offset, string
