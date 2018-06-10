"use strict";

//1.Travel Plans
function travelPlans(arrStr) {
    const spelized = ["Programming", "Hardware maintenance", "Cooking", "Translating", "Designing"];
    const average = ["Driving", "Managing", "Fishing", "Gardening"];
    const clumzy = ["Singing", "Accounting", "Teaching", "Exam-Making", "Acting", "Writing", "Lecturing", "Modeling", "Nursing"];
    let cntSplz = 1;
    let cntClmz = 1;
    let totalGold = 0;

    for (let token of arrStr) {
        let [profession, gold] = token.split(" : ");
        gold = Number(gold);

        if (spelized.indexOf(profession) > -1) {
            if (gold < 200) {
                continue;
            }
            gold -= (gold * 20) / 100;
            if (cntSplz % 2 === 0) {
                gold += 200;
            }
            cntSplz++;
            totalGold += gold;
        } else if (average.indexOf(profession) > -1) {
            totalGold += gold;
        } else if (clumzy.indexOf(profession) > -1) {
            if (cntClmz % 2 === 0) {
                gold -= (gold * 5) / 100;
            } else if (cntClmz % 3 === 0) {
                gold -= (gold * 10) / 100;
            }
            totalGold += gold;
            cntClmz++;
        }

    }
    console.log(`Final sum: ${totalGold.toFixed(2)}`);
    totalGold < 1000 ? console.log(`Mariyka need to earn ${(1000 - totalGold).toFixed(2)} gold more to continue in the next task.`)
        : console.log(`Mariyka earned ${(totalGold - 1000).toFixed(2)} gold more.`)
}

// travelPlans(
//     ["Programming : 500",
//     "Driving : 243.55", "Acting : 200",
//     "Singing : 100", "Cooking : 199",
//     "Hardware maintenance : 800",
//     "Gardening : 700",
//     "Programming : 500"]);

//2.Travel Investigation
function travelInvetigation(arrStr) {
    let validSentences = [];
    let invalidSentences = [];
    let validCounter = 1;
    let invalidCounter = 1;

    let delimeter = arrStr[1];
    let companies = arrStr[0].split(delimeter);
    arrStr.splice(0, 2);

    for (let sentence of arrStr) {
        let isValid = false;
        for (let company of companies) {
            let currentRegex = new RegExp(`${company}`, "gmi");
            if (currentRegex.test(sentence)) {
                isValid = true;
            } else {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            validSentences.push(`${validCounter++}. ${sentence.toLowerCase()}`);
        } else {
            invalidSentences.push(`${invalidCounter++}. ${sentence.toLowerCase()}`);
        }
    }

    if ((validSentences.length !== 0) && (invalidSentences.length === 0)) {
        console.log("ValidSentences");
        validSentences.forEach(s => console.log(s));
        return;
    }
    if (invalidSentences.length !== 0 && validSentences.length === 0) {
        console.log("InvalidSentences");
        invalidSentences.forEach(s => console.log(s));
        return;
    }
    if ((invalidSentences.length !== 0) && (validSentences.length !== 0)) {
        console.log("ValidSentences");
        validSentences.forEach(s => console.log(s));
        console.log("==============================");
        console.log("InvalidSentences");
        invalidSentences.forEach(s => console.log(s));
    }
}


travelInvetigation(
    ["bulgariatour@, minkatrans@, koftipochivkaltd",
        "@,",
        "Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
        "dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
        "someone continues as no "]


);

//Minke bre
function minkeDecode(arrStr) {

    let [charStart, charEnd, rightWord, text] = arrStr;
    let town = "";

    let country = text.match(/[A-Z][\w]+[A-Z]/)[0].split("");
    country.splice(charStart, charEnd - charStart + 1, rightWord);
    let finalLetter = (country[country.length - 1]).toLowerCase();
    country[country.length - 1] = finalLetter;
    country = country.join("");

    let regCatchNums = new RegExp(/\d{3}\.*\d*/gms);

    let haveAAatch = regCatchNums.exec(text);

    while (haveAAatch) {
        let num = 0;
        if (haveAAatch[0].indexOf(".") > -1) {
            num = Math.ceil(Number(haveAAatch[0]));
            town += String.fromCharCode(num);
        }
        else {
            num = Number(haveAAatch[0]);
            town += String.fromCharCode(num);
        }
        haveAAatch = regCatchNums.exec(text);
    }


    console.log(`${country} => ${toTitleCase(town)}`);

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}

//minkeDecode(["1", "4","loveni", "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"]);

//4.Travel Time
function travelTime(arrStr) {
    let myMap = new Map();
    let result = "";

    for (let destination of arrStr) {
        let [country, town, price] = destination.split(" > ");
        price = Number(price.trim());
        town = toTitleCase(town.trim());
        country = country.trim();


        if (!myMap.has(country)) {
            myMap.set(country, new Map())
        }
        if (!myMap.get(country).has(town)) {
            myMap.get(country).set(town, price);
        }
        let currentPrice = myMap.get(country).get(town);
        if (price < currentPrice) {
            myMap.get(country).set(town, price)
        }
    }

    Array.from(myMap.keys()).sort((a, b) => a.localeCompare(b))
        .forEach(cntr => {
            result += (cntr + " -> ");
            let townsAndCosts = myMap.get(cntr);
            townsAndCosts[Symbol.iterator] = function* () {
                yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
            };

            for (let [k, v] of townsAndCosts) {
                result += (k + " -> " + v + " ");
            }
            result += "\n"
        });

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
    }

    console.log(result);
}

travelTime(["Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200"]
);