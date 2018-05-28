"use strict"

//01. Hello JS
function helloJS(string) {
    console.log(`Hello, ${string}, I am JavaScript!`);
}


//02. Are and perimeter
function areaAndPerimeter(a, b) {
    console.log(Math.round((a * b) * 100) / 100);
    console.log(Math.round((a * 2 + b * 2) * 100) / 100);
}

//03. Distance over Time
function distOverTime(input) {
    let [speed1, speed2, timeInSec] = [input[0], input[1], input[2]];
    let distance1 = speed1 * timeInSec / 60 / 60;
    let distance2 = speed2 * timeInSec / 60 / 60;
    console.log(1000 * Math.abs(distance1 - distance2));
}

//04. Distance in 3D
function distanceIn3d(arr) {
    let [x1, y1, z1, x2, y2, z2] = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
    console.log(Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) + Math.pow((z1 - z2), 2)));
}

//05. Grads to Radians
function gradsToDegrees(num) {
    let grads = Number(num);

    grads = grads % 400;
    if (grads < 0) {
        grads += 400;
    }
    let degrees = grads / 400 * 360;
    console.log(degrees);
}

//06. Compound Interest
function comInter(numArr) {
    let [primcipalSum, interestRate, months, years] =
        [numArr[0], numArr[1] / 100, numArr[2], numArr[3]]

    let frequency = 12 / months;

    let compInter = primcipalSum * (Math.pow((1 + interestRate / frequency), frequency * years))
    console.log(Math.round(compInter * 100) / 100);
}

//07. Rounding
function rounding(arrNum) {
    let [number, precision] = [arrNum[0], arrNum[1]];

    let zeroString = "0";
    if (precision > 15) {
        precision === 15;
    }

    let divider = Number(1 + zeroString.repeat(precision));
    let result = Math.round(number * divider) / divider;
    console.log(result);
}

//08. Imperial Units
function inchToFootConvertor(inch) {
    let footMesure = 12;
    let foots = Math.floor(inch / footMesure);
    let remainingInches = inch % footMesure;

    console.log(` ${foots}'-${remainingInches}"`);

}

//09. Now Playing
function nowPlaying(arrStr) {
    let [track, artist, minutesSeconds] = [arrStr[0], arrStr[1], arrStr[2]];
    console.log(`Now Playing: ${artist} - ${track} [${minutesSeconds}]`);
}

//10. Compose Tag

function composeTag(arrOfStr) {
    let [locationOfTheFile, alternateText] = [arrOfStr[0], arrOfStr[1]];

    console.log(`<img src="${locationOfTheFile}" alt="${alternateText}">`);
}

//11. BinaryToDecimal
function binaryToDecimal(binStr) {
    console.log(parseInt(binStr, 2));
}

//12. Assign Properties
function assignProperties(arrStr) {
    let obj = {
        [arrStr[0]]: arrStr[1]
    };
    obj[arrStr[2]] = arrStr[3];
    obj[arrStr[4]] = arrStr[5];
    console.log(obj);
}

//13. Last Month
function lastMonth(dateArr) {
    let [day, month, year] = dateArr.join(" ").trim().split(" ");
    let date = new Date(year, month, day);
    console.log(new Date(year, month - 1, 0).getDate());
}

//14. Biggest of 3 Numbers
function biggestFromThree(arrNum) {
    console.log(arrNum.sort((a, b) => a < b)[0]);
}

//15. Point in Rectangle
function pointsInRect(arrNum) {
    let [x, y, xMin, xMax, yMin, yMax] = arrNum;
    console.log((x >= xMin && x <= xMax && y >= yMin && y <= yMax) ? "inside" : "outside");
}


//16. Odd Numbers 1 to N
function oddNumsToN(n) {
    for (let i = 1; i <= n; i += 2) {
        if (i % 2 !== 0) {
            console.log(i);
        }
    }
}

//17. Triangle of Dollars
function triangleOfDollars(num) {
    let result = "";
    for (let i = 0; i < num; i++) {
        for (let j = 0; j <= i; j++) {
            result += "$";
        }
        result += "\n";
    }
    console.log(result);
}

//18. Movie Prices
function moviePrices(srtArray) {
    let [movie, day] = srtArray;
    let obj = {
        "the godfather": {
            "monday": 12,
            "tuesday": 10,
            "wednesday": 15,
            "thursday": 12.50,
            "friday": 15,
            "saturday": 25,
            "sunday": 30
        },
        "schindler's list": {
            "monday": 8.50,
            "tuesday": 8.50,
            "wednesday": 8.50,
            "thursday": 8.50,
            "friday": 8.50,
            "saturday": 15,
            "sunday": 15
        },
        "casablanca": {
            "monday": 8,
            "tuesday": 8,
            "wednesday": 8,
            "thursday": 8,
            "friday": 8,
            "saturday": 10,
            "sunday": 10
        },
        "the wizard of oz": {
            "monday": 10,
            "tuesday": 10,
            "wednesday": 10,
            "thursday": 10,
            "friday": 10,
            "saturday": 15,
            "sunday": 15
        }
    };
    let dayAnPrice = obj[movie.toLowerCase()][day.toLowerCase()];

    if (obj.hasOwnProperty(movie.toLowerCase())
        && obj[movie.toLowerCase()].hasOwnProperty(day.toLowerCase())) {
        console.log(obj[movie.toLowerCase()][day.toLowerCase()]);
    }
    else {
        console.log("error");
    }
}

//19. Quadratic Equation
function quadrEquat(a, b, c) {

    let x = 0, x1 = 0;
    let discr = Math.pow(b, 2) - 4 * a * c;
    let equatation = 6 * Math.pow(x, 2) + 11 * x - 35;
    if (discr > 0) {
        let arrOfNum = [];
        x = (-b + Math.sqrt(discr)) / (2 * a);
        arrOfNum.push(x);
        x = (-b - Math.sqrt(discr)) / (2 * a);
        arrOfNum.push(x);
        arrOfNum.sort((a, b) => a > b).forEach(n => console.log(n))
    } else if (discr === 0){
        x = -b/(2*a);
        console.log(x);
    }
    else {
        console.log("No");
    }
}

//20. Multiplication Table
function muliplTable (n) {
    let result = '<table border ="1">\n';
    result += "  <tr><th>x</th>";
    for (let i = 1; i <= n; i++) {
        result += `<th>${i}</th>`
    }
    result += "</tr>\n";

    let addition = 0;

    for (let i = 1; i <= n; i++) {
        result += `  <tr><th>${i}</th>`;
        for (let k = 1; k <= n; k++) {

            result += `<td>${i * k}</td>`
            addition = i + k;
        }
        result += "</tr>\n"
    }

    result += "</table>";

    console.log(result);

}

//21. Figure of 4 Squares
function figure(n) {
    let length = n % 2 !== 0 ? n : n - 1;
    let count = (2 * n - 4) / 2;
    let middle = Math.ceil(length / 2);
    for (let i = 1; i <= length; i++) {
        if (i == 1 || i == middle || i == length) {
            console.log(`+${'-'.repeat(count)}+${'-'.repeat(count)}+`);
        } else {
            console.log(`|${' '.repeat(count)}|${' '.repeat(count)}|`);
        }
    }
}

//22. ** Monthly Calendar
function calendar([day, month, year])
{
    // TODO: return the HTML text holding the calendar table

    month--; // months in Date() are [0...11], not [1...12]
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
        daysInMonth[1] = 29; // leap year

    // Print the calendar table header
    let html = '<table>\n';
    html += '  <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n';

    // Print the days of the previous month
    let week = 0;
    let date = new Date(year, month, 1);
    let dayOfWeek = date.getDay();
    let firstDayPrevMonth = daysInMonth[(month-1 + 12) % 12]-dayOfWeek;
    if (dayOfWeek > 0)
        html += '  <tr>';
    for (let i=1; i<=dayOfWeek; i++) {
        html += '<td class="prev-month">' + (firstDayPrevMonth + i) + '</td>';
        week++;
    }

    // Print the days of the current month
    let monthDaysCount = daysInMonth[month];
    for (let i=1; i<=monthDaysCount; i++) {
        if (week == 0)
            html += '  <tr>';
        if (day == i)
            html += '<td class="today">' + i + '</td>';
        else
            html += '<td>' + i + '</td>';
        week++;
        if (week == 7) {
            html += '</tr>\n';
            week=0;
        }
    }

    // Print the days of the next month
    for (let i=1; week!=0; i++) {
        html += '<td class="next-month">' + i + '</td>';
        week++;
        if (week == 7) {
            html += '</tr>\n';
            week = 0;
        }
    }

    html += '</table>';
    return html;
}