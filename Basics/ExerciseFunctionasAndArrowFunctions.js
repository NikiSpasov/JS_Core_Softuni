"use strict";

//1. Inside Volume
function insideOutsideVolume (arrOfNum) {
    for (let i = 0; i < arrOfNum.length; i+=3) {
        let x = arrOfNum[i];
        let y = arrOfNum[i+1];
        let z = arrOfNum[i+2];

        if (inVolume(x, y, z)) {
            console.log("inside");
            continue;
        }
        console.log("outside");
    }

    function inVolume(x, y, z) {
        let x1 = 10; x2 = 50; y1 = 20; y2 = 80; z1 = 15; z2 = 50;

        if (x >= x1 && x <= x2) {
            if (y >= y1 && y <= y2) {
                if (z >= z1 && z <= z2) {
                    return true;
                }
            }
        }
        return false;
    }
}

//02. Road Radar
function roadRadar (arrData) {
    let [speed, zone] = arrData;
    speed = Number(speed);

    let limit = getSpeeLimit(zone);

    if (getInfraction(speed, limit)) {
        console.log(getInfraction(speed, limit));
    }

    function getInfraction (speed, limit) {
        let overspeed = speed - limit;
        if (overspeed <= 0) {
            return false;
        } else {
            if (overspeed <= 20) {
                return "speeding";
            } else if (overspeed > 20 && overspeed <= 40) {
                return "excessive speeding";
            }
            return "reckless driving"
        }
    }

    function getSpeeLimit (zone) {
        switch (zone){
            case "motorway": return 130;
            case "interstate": return 90;
            case "city": return 50;
            case "residential": return 20;
        }
    }
}

//03. Template Format
function templateFormat (arrStr) {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n'

    for (let i = 0; i < arrStr.length; i+=2) {
        let question = arrStr[i];
        let answer = arrStr[i + 1];
result +=
`  <question>
    ${question} 
  </question> 
  <answer> 
    ${answer}
  </answer>\n`

    }
    result += "</quiz>";
    console.log(result);
}

//04. Cooking by Numbers
function cookByNumber (inputArr) {
    let num = Number(inputArr[0]);
    let result = "";
    for (let command of inputArr.slice(1)) {
        switch(command){
            case "chop": num = num / 2; result += num + "\n"; break;
            case "dice": num = Math.sqrt(num); result += num + "\n"; break;
            case "spice": num += 1; result += num + "\n"; break;
            case "bake": num *= 3; result += num + "\n"; break;
            case "fillet": num = num - (0.2 * num); result += num + "\n"; break;
        }
    }
    console.log(result);
}

//05. Modify Average
function modifyAverage (num) {

    let stringNum = num.toString();

    while (true){
        if (stringNum
            .split("")
            .map(s => Number(s))
            .reduce((a, b) => a + b) / stringNum.length > 5)  {
            console.log(stringNum);
            return;
        }
        stringNum += "9";
    }
}

//6. Validity Checker
function validityChecker (arrNum) {

    let [x1, y1, x2, y2] = arrNum;

    if (isValid(x1, y1, 0, 0)) {
        console.log(`{${x1}, ${y1}} to {0, 0} is valid`);
    } else {
        console.log(`{${x1}, ${y1}} to {0, 0} is invalid`);
    }

    if (isValid(x2, y2, 0, 0)) {
        console.log(`{${x2}, ${y2}} to {0, 0} is valid`);
    } else {
        console.log(`{${x2}, ${y2}} to {0, 0} is invalid`);
    }

    if (isValid(x1, y1, x2, y2)) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
    } else {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
    }

    function isValid (x1, y1, x2, y2) {
        let distance = Math.sqrt(
            (Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
             );

        return distance === Math.ceil(distance);
    }
}

//07. Treasure Locator
function printTreasureLocation(params) {
    for (let i = 0; i < params.length; i++) {
        let col = params[i++];
        let row = params[i];

        let location = (row >= 0 && row <= 1 && col >= 8 && col <= 9) ? 'Tokelau'
            : (row >= 1 && row <= 3 && col >= 1 && col <= 3) ? 'Tuvalu'
                : (row >= 3 && row <= 6 && col >= 5 && col <= 7) ? 'Samoa'
                    : (row >= 6 && row <= 8 && col >= 0 && col <= 2) ? 'Tonga'
                        : (row >= 7 && row <= 8 && col >= 4 && col <= 9) ? 'Cook'
                            : 'On the bottom of the ocean';

        console.log(location);
    }
}

//08. Trip Length
function tripLength (points) {
    let [x1, y1, x2, y2, x3, y3] = points;

    let distance12 = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    let distance23 = Math.sqrt(Math.pow((x3 - x2), 2) + Math.pow((y3 - y2), 2));
    let distance13 = Math.sqrt(Math.pow((x3 - x1), 2) + Math.pow((y3 - y1), 2));


    if ((distance12 <= distance13) && (distance13 >= distance23)) {
        let a = distance12 + distance23;
        console.log('1->2->3: ' + a);
    }
    else if ((distance12 <= distance23) && (distance13 < distance23)) {
        let b = distance13 + distance12;
        console.log('2->1->3: '+ b);
    }
    else {
        let c = distance23 + distance13;
        console.log('1->3->2: ' + c);
    }

}

//9. *Radio Crystals
function radioCrystal(input){
    let target = Number(input[0]);

    function process(crystalThickness, action){
        switch(action) {
            case "cut":
                crystalThickness = crystalThickness >> 2;
                cutCount++;
                break;
            case "lap":
                crystalThickness /= 1.25;
                lapCount++;
                break;
            case "grind":
                crystalThickness -= 20;
                grindCount++;
                break;
            case "etch":
                crystalThickness -= 2;
                etchCount++;
                break;
            case "xRay":
                crystalThickness += 1;
                xrayCount++;
                return crystalThickness;
        }

        return transportingWashing(crystalThickness);
    }

    function transportingWashing(crystalThickness) {
        return Math.floor(crystalThickness);
    }

    for(let i = 1; i < input.length; i++){
        let current = input[i];
        let cutCount = 0, lapCount = 0, grindCount = 0, etchCount = 0, xrayCount = 0;
        let used = false;

        console.log(`Processing chunk ${current} microns`);

        while(current !== target){
            while(current >> 2 >= target - 1){
                current = process(current,"cut");
            }
            while(current / 1.25 >= target - 1){
                current = process(current,"lap");
            }
            while(current - 20 >= target - 1){
                current = process(current,"grind");
            }
            while(current - 2 >= target - 1){
                current = process(current,"etch");
            }
            if(current + 1 === target && used === false){
                used = true;
                current = process(current,"xRay");
            }
        }

        if(cutCount > 0) {
            console.log(`Cut x${cutCount}`)
            console.log("Transporting and washing");
        }

        if(lapCount > 0) {
            console.log(`Lap x${lapCount}`)
            console.log("Transporting and washing");
        }

        if(grindCount > 0) {
            console.log(`Grind x${grindCount}`)
            console.log("Transporting and washing");
        }

        if(etchCount > 0) {
            console.log(`Etch x${etchCount}`)
            console.log("Transporting and washing");
        }

        if(used) {
            console.log(`X-ray x1`)
        }

        console.log(`Finished crystal ${target} microns`)
    }
}

//10. DNA Helix
function dnaHelix(number) {
    number = Number(number);
    let str = 'ATCGTTAGGG';
    let counter = 0;
    for(let i=0; i<number; i++) {
        if(i%4 === 0) {
            console.log(`**${str[counter%10]}${str[counter % 10 + 1]}**`);
        } else if(i%4 === 1) {
            console.log(`*${str[counter%10]}--${str[counter % 10 + 1]}*`);
        } else if(i%4 === 2) {
            console.log(`${str[counter%10]}----${str[counter%10 + 1]}`);
        } else if(i%4 === 3) {
            console.log(`*${str[counter%10]}--${str[counter % 10 + 1]}*`);
        }
        counter += 2
    }
}