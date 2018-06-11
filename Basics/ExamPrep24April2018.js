"use strict";

//Problem 1 – Gladiator Expenses
function gladiator(lostFightsCount, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    let shieldCounter = 0, helmetBroken, swordBroken, result = 0,
        swdCnt = 0, shldCnt = 0, armCnt = 0, hlmtCnt = 0;
    for (let i = 1; i <= lostFightsCount; i++) {
        if (i % 2 === 0) {
            helmetBroken = true;
            hlmtCnt++;
        }
        if (i % 3 === 0) {
            swordBroken = true;
            swdCnt++;
        }
        if (helmetBroken && swordBroken) {
            swordBroken = false;
            helmetBroken = false;
            shldCnt++;
            if (shldCnt % 2 === 0) {
                armCnt++;
            }
        } else {
            if (helmetBroken) {
                helmetBroken = false;
            }
            if (swordBroken) {
                swordBroken = false;
            }
        }
    }
    result = (hlmtCnt * helmetPrice) + (swdCnt * swordPrice) + (shldCnt * shieldPrice) + (armCnt * armorPrice)
    console.log(`Gladiator expenses: ${(Math.round(result * 100) / 100).toFixed(2)} aureus`);
}

//Problem 2 - Gladiator Inventory
function inventory(strArr) {
    let inventoryList = strArr.splice(0, 1).join(" ").split(" ");
    for (let command of strArr) {
        let currentCommand = command.split(/\s+/);
        let equipment = currentCommand[1];
        switch (currentCommand[0]) {
            case "Buy":
                if (inventoryList.indexOf(equipment) < 0) {
                    inventoryList.push(equipment)
                }
                break;

            case "Trash":
                let indexOfElement = inventoryList.indexOf(equipment);
                if (indexOfElement >= 0) {
                    inventoryList.splice(indexOfElement, 1);
                }
                break;

            case "Repair":
                let indexOfElementForReapir = inventoryList.indexOf(equipment);
                if (indexOfElementForReapir >= 0) {
                    let elementToMove = inventoryList.splice(indexOfElementForReapir, 1)[0];
                    inventoryList.push(elementToMove);
                }
                break;

            case "Upgrade":
                let toSearchFor = equipment.split("-")[0];
                let indexForUpgrade = inventoryList.indexOf(toSearchFor);
                if (indexForUpgrade >= 0) {
                    let upgrade = toSearchFor + ":" + equipment.split("-")[1];
                    inventoryList.splice(indexForUpgrade + 1, 0, upgrade)
                }
                break;
            case "Fight!":
                console.log(inventoryList.join(" "));
                break;
        }
    }
}

//Problem 03. Ancient VS Memory
function decode(arrStr) {

    let regex = new RegExp(/32656 19759 32763\s0\s\d+\s0\s(.*?)\s0/g);
    let result = "";
    arrStr.forEach(str => result += " " + str);
    let match = regex.exec(result);

    let singleWord = "";
    while (match) {
        for (let char of match[1].split(" ")) {
            singleWord += String.fromCharCode(char);
        }
        console.log(singleWord);
        singleWord = "";
        match = regex.exec(result);
    }
}

//04. Arena Tier
function arena(arrStr) {

    let gladiators = new Map();

    for (let row of arrStr) {
        if (row === "Ave Cesar") {
            let totalPoints = 0;

            //mapping totalPoints for every gladiator:
            for (let [key, innerMap] of gladiators) {
                let totalPoints = ([...innerMap.values()].reduce((a, b) => a + b))
                gladiators.get(key).set("totalPoints", totalPoints);
            }
            //sorting and printing:
            [...gladiators]
                .sort((a, b) => {
                        if (b[1].get("totalPoints") - a[1].get("totalPoints") !== 0) {
                            return b[1].get("totalPoints") - a[1].get("totalPoints");
                        }
                        return a[0].localeCompare(b[0])
                    }
                ).forEach(a => {
                    console.log(`${a[0]}: ${gladiators.get(a[0]).get("totalPoints")} skill`);
                    [...a[1]].splice(0, [...a[1]].length - 1)
                        .sort((a, b) => {
                            if (a[1] - b[1] !== 0) {
                                return b[1] - a[1];
                            }
                            return a[0].localeCompare(b[0])
                        }).forEach(sk =>
                        console.log(`- ${sk[0]} <!> ${sk[1]}`));
                });
        }
        //battle mode:
        if (row.indexOf("vs") < 0) {
            let [gladiator, tech, skillLevel] =
                row.split(/ -> /);
            skillLevel = Number(skillLevel);
            if (!gladiators.has(gladiator)) {
                gladiators.set(gladiator, new Map());
            }
            if (!gladiators.get(gladiator).has(tech)) {
                gladiators.get(gladiator).set(tech, 0);
            }
            let currentSkill = gladiators.get(gladiator).get(tech);
            if (currentSkill < skillLevel) {
                gladiators.get(gladiator).set(tech, skillLevel)
            }
            continue;
        }
        let [g1, g2] = row.split(/ vs /);

        if (gladiators.has(g1) && gladiators.has(g2)) {

            let arrG1 = Array.from(gladiators.get(g1).keys());
            let arrG2 = Array.from(gladiators.get(g2).keys());

            for (let g1skill of  arrG1) {
                for (let g2skill of  arrG2) {
                    if (g1skill === g2skill) {
                        let firstTotalPoints = [...gladiators.get(g1).values()].reduce((a, b) => a + b);
                        let secondTotalPoints = [...gladiators.get(g2).values()].reduce((a, b) => a + b);

                        if (firstTotalPoints > secondTotalPoints) {
                            gladiators.delete(g2);
                            break;
                        } else if (firstTotalPoints > secondTotalPoints){
                            gladiators.delete(g1);
                            break;
                        }
                    }
                }
            }
        }
    }
}

arena(["Pesho -> Duck -> 400",
    "Julius -> Shield -> 150",
    "Gladius -> Heal -> 200",
    "Gladius -> Support -> 250",
    "Gladius -> Shield -> 250",
    "Pesho vs Gladius",
    "Gladius vs Julius",
    "Gladius vs Gosho",
    "Ave Cesar"
]);


