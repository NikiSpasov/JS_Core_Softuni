"use strict";

//1. Bitcoin Mining
function bitCoinMining(arrStr) {
    arrStr = arrStr.map(e => Number(e));

    let totalSum = 0;
    let totalBitcoins = 0;
    let cnt = 0;
    let dayFirstPurchased = [];

    for (let goldInGrams of arrStr) {
        cnt++;
        if (cnt % 3 === 0) {
            goldInGrams -= (goldInGrams * 30) / 100;
        }

        let leva = goldInGrams * 67.51;
        totalSum += leva;
        if (totalSum >= 11949.16) {
            totalBitcoins += Math.trunc(totalSum / 11949.16);
            totalSum = totalSum % 11949.16;
            dayFirstPurchased.push(cnt);
        }

    }
    console.log(`Bought bitcoins: ${totalBitcoins}`);
    if (dayFirstPurchased.length > 0) {
        console.log(`Day of the first purchased bitcoin: ${dayFirstPurchased[0]}`);
    }
    console.log(`Left money: ${totalSum.toFixed(2)} lv.`);
}


//02. Air Pollution
function polution(numsToFillTheMatrix, polutionCommands) {
    let initialMatrix = [[], [], [], [], []];
    let result = [];

    for (let i = 0; i < numsToFillTheMatrix.length; i++) {
        initialMatrix[i] = numsToFillTheMatrix[i].split(' ');
    }

    for (let command of polutionCommands) {
        let [com, amount] = command.split(" ");
        amount = Number(amount);
        switch (com) {
            case "breeze":
                initialMatrix[amount] = initialMatrix[amount].map(x => Number(x) - 15);
                break;
            case "gale":
                for (let i = 0; i < initialMatrix.length; i++) {
                    initialMatrix[i][amount] = Number(initialMatrix[i][amount]);
                    initialMatrix[i][amount] -= 20;
                }
                break;

            case "smog":
                for (let row in initialMatrix) {
                    initialMatrix[row] = initialMatrix[row].map(x => Number(x) + amount);
                }
        }
    }

    for (let i = 0; i < initialMatrix.length; i++) {
        for (let j = 0; j < initialMatrix[i].length; j++) {
            let currentNum = initialMatrix[i][j];
            if (initialMatrix[i][j] >= 50) {
                result.push(`[${i}-${j}]`);
            }
        }
    }
    if (result.length > 0) {
        console.log("Polluted areas: " + result.join(", "));
    } else {
        console.log("No polluted areas");
    }
}


// polution([
//         "5 7 2 14 4",
//         "21 14 2 5 3",
//         "3 16 7 42 12",
//         "2 20 8 39 14",
//         "7 34 1 10 24",
//     ],
//     ["breeze 1", "gale 2", "smog 35"]
//
//
// );


//3 Survey Parser

function surveyParser(singleString) {
    let allRegex = singleString.match(/<svg>.*<\/svg>/);
    let result = "";
    let totalVotes = 0;
    let totalRating = 0;
    if (allRegex) {
        let fullMatch = allRegex[0];
        let surveyText = fullMatch.match(/<cat><text>[\w\W]*\[([\w\W]+)\]<\/text><\/cat>/gm);
        if (surveyText) {
            let currentMatch = surveyText[0].match(/\[[\w\W]+\]/);
            currentMatch = currentMatch[0];
            currentMatch = currentMatch.slice(1, currentMatch.length - 1);
            result += currentMatch + ": ";

            let valueAndCountRegex = new RegExp(/<g><val>([1-9]|10)<\/val>([\d]+)<\/g>/gm);

            let match = valueAndCountRegex.exec(fullMatch);

            if (!match) {
                console.log("Invalid format");
                return;
            }

            while (match) {
                let value = Number(match[1]);
                let votes = Number(match[2]);
                let currentRating = votes * value;
                totalVotes += votes;
                totalRating += currentRating;
                match = valueAndCountRegex.exec(fullMatch);
            }
            result += Math.round(totalRating / totalVotes * 100) / 100;


        } else {
            console.log("Invalid format");
            return;
        }

    } else {
        result += "No survey found";
    }


    console.log(result);
}

// surveyParser(
//     "<p>Some random text</p><svg><cat><text>How do you rate our food? " +
//     "[Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><" +
//     "g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></c" +
//     "at></svg><p>Some more random text</p>");


//04. Game of Epicness

function gameOfEpicness(inputKingdoms, matrixString) {

    let finalResult = "";

    let kingdoms = makeKingdoms();
    let kingdomStatistic = {};
    let generalStatistic = {};

    for (let kingdom of Object.keys(kingdoms)) {
        kingdomStatistic[kingdom] = {wins: 0, losses: 0}
    }

    Object.values(kingdoms).forEach((v, k) => Object.keys(v).forEach( gen =>
        generalStatistic[gen] = {wins: 0, losses: 0, army: 0, kingdom: ""}));

    for (let battle of matrixString) {
        let [attackingKingdom, attackingGeneral, defendingKingdom, defendingGeneral]
            = battle;
        if (attackingKingdom === defendingKingdom) {
            continue;
        }
        let attackerSoldiersCount = kingdoms[attackingKingdom][attackingGeneral];
        let defenderSoldiersCount = kingdoms[defendingKingdom][defendingGeneral];

        if (attackerSoldiersCount > defenderSoldiersCount) {
            kingdoms[attackingKingdom][attackingGeneral] += Math.floor(attackerSoldiersCount * 0.1);
            kingdoms[defendingKingdom][defendingGeneral] -= Math.floor(defenderSoldiersCount * 0.1);

            kingdomStatistic[attackingKingdom]["wins"]++;
            kingdomStatistic[defendingKingdom]["losses"]++;

            generalStatistic[attackingGeneral]["wins"]++;
            generalStatistic[attackingGeneral]["army"] = kingdoms[attackingKingdom][attackingGeneral];
            generalStatistic[attackingGeneral]["kingdom"] = attackingKingdom;

            generalStatistic[defendingGeneral]["losses"]++;
            generalStatistic[defendingGeneral]["army"] = kingdoms[defendingKingdom][defendingGeneral];
            generalStatistic[defendingGeneral]["kingdom"] = defendingKingdom;


        } else if (attackerSoldiersCount < defenderSoldiersCount) {
            kingdoms[attackingKingdom][attackingGeneral] -= Math.floor(attackerSoldiersCount * 0.1);
            kingdoms[defendingKingdom][defendingGeneral] += Math.floor(defenderSoldiersCount * 0.1);

            kingdomStatistic[attackingKingdom]["losses"]++;
            kingdomStatistic[defendingKingdom]["wins"]++;

            generalStatistic[defendingGeneral]["wins"]++;
            generalStatistic[defendingGeneral]["army"] = kingdoms[defendingKingdom][defendingGeneral];
            generalStatistic[defendingGeneral]["kingdom"] = defendingKingdom;

            generalStatistic[attackingGeneral]["losses"]++;
            generalStatistic[attackingGeneral]["army"] = kingdoms[attackingKingdom][attackingGeneral];
            generalStatistic[attackingGeneral]["kingdom"] = attackingKingdom;

        }
    }
    let winner = Object.keys(kingdomStatistic).sort(function (a, b) {
        if (kingdomStatistic[a]["wins"] !== kingdomStatistic[b]["wins"]) {
            return kingdomStatistic[a]["wins"] < kingdomStatistic[b]["wins"];
        } else if ( kingdomStatistic[a]["losses"] !== kingdomStatistic[b]["losses"]){
            return kingdomStatistic[a]["losses"] > kingdomStatistic[b]["losses"]
        } else {
            return a.localeCompare(b)
        }
    })[0];

    finalResult += `Winner: ${winner}\n`;

    let keys = Object.keys(generalStatistic)
        .filter(k => generalStatistic[k]["kingdom"] === winner)
        .sort(function(a, b){
            return generalStatistic[a]["army"] <
                generalStatistic[b]["army"]})

    let cnt = 0;

    for (let gen in Object.values(generalStatistic)
        .filter(k => k["kingdom"] === winner)
        .sort(function(a, b){
        return a["army"] < b["army"]})
            .forEach( function (e){
                finalResult += `\/\\general: ${keys[cnt]}\n`;
                finalResult += `---army: ${Math.floor(e['army'])}\n`;
                finalResult += `---wins: ${e['wins']}\n`;
                finalResult += `---losses: ${e['losses']}\n`;
                cnt++;
            }
       ));

    console.log(finalResult);

    function makeKingdoms() {
        let kingdoms = {};
        for (let kingdom of inputKingdoms) {
            let [kingdomName, generalName, armyNumber] = Object.values(kingdom);
            if (kingdoms.hasOwnProperty(kingdomName)) {
                if (kingdoms[kingdomName].hasOwnProperty(generalName)) {
                    kingdoms[kingdomName][generalName] += armyNumber;
                    continue;
                } else {
                    kingdoms[kingdomName][generalName] = armyNumber;
                    continue;
                }
            }
            kingdoms[kingdomName] = {[generalName]: armyNumber};
        }
        return kingdoms;
    }
}

gameOfEpicness([
        {kingdom: "Maiden Way", general: "Merek", army: 5000},
        {kingdom: "Stonegate", general: "Ulric", army: 4900},
        {kingdom: "Stonegate", general: "Doran", army: 70000},
        {kingdom: "YorkenShire", general: "Quinn", army: 0},
        {kingdom: "YorkenShire", general: "Quinn", army: 2000},
        {kingdom: "Maiden Way", general: "Berinon", army: 100000}],

    [
        ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"]
    ]
);