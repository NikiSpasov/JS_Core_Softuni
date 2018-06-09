//01. Spice Must Flow
function spf(startingYield) {
    startingYield = Number(startingYield);

    let finalResult = 0;
    const workersEatPerDay = 26;
    daysConsumtion = 1;
    while (startingYield > 99) {
        finalResult += startingYield;
        startingYield -= 10;
        daysConsumtion++;
        if (finalResult >= workersEatPerDay) {
            finalResult -= workersEatPerDay
        }
    }
    if (finalResult >= workersEatPerDay) {
        finalResult -= workersEatPerDay
    }

    console.log(`${daysConsumtion - 1}`);
    console.log(finalResult);
}

//spf(["450"]);

//02. Build a Wall
function theWall(arrStr) {
    arrStr.map(a => Number(a));

    const heightPurpose = 30;
    const concretePerFootPerDay = 195;
    const oneCubicYardPrice = 1900;
    let totalConcreteUsed = 0;

    let concreteDayly = [];
    let isDone = false;
    while (!isDone) {

        let totalForThisDay = 0;
        for (let i = 0; i < arrStr.length; i++) {
            let a = arrStr.some(num => num < heightPurpose);
            if (!a) {
                isDone = true;
            } else {
                if (arrStr[i] < 0 || arrStr[i] >= 30) {
                    continue;
                }
                totalConcreteUsed += concretePerFootPerDay;
                totalForThisDay += concretePerFootPerDay;
                arrStr[i]++;
            }
        }
        totalForThisDay !== 0 ? concreteDayly.push(totalForThisDay) : concreteDayly.length;
    }

    console.log(concreteDayly.join(", "));
    console.log(totalConcreteUsed * oneCubicYardPrice + " pesos");
}

//theWall(["10", "30", "10", "10", "10"]);

//03. Format Helper
function formatThisMaaFaa(arrStr) {
    let text = arrStr[0];
    let firstReg = new RegExp(/([\.,!?:;])\s*/gm);
    let secondReg = new RegExp(/\s+([.,!?:;])/gm);
    let thirdReg = new RegExp(/(\.)\s+(\d+)/gm);
    let fourth = new RegExp(/\"\s*(.*?)\s*\"/gm)
    console.log(text.replace(firstReg, "$1 ")
        .replace(secondReg, "$1")
        .replace(thirdReg, "$1$2")
        .replace(fourth, "\"$1\""));

}

//formatThisMaaFaa(['Test everything, including:dates    : 4.     3         .10, digits:1,2,3,4,numbers :  14.4,15.6,3. Quotation should be should be trimmed after additional spaces are given:"Quote should remain the same, even with explanation mark in the end!"; this quote should be trimmed in the beginning: "   Trim start"!'])

//04. Airport
function airPortApp(arrStr) {

    let cities = new Map();
    let planesAtTheAirport = [];

    for (let input of arrStr) {
        let [plainId, town, passengerCount, action] =
            input.split(" ");
        passengerCount = Number(passengerCount);

        if (action === "land") {
            if (planesAtTheAirport.indexOf(plainId) < 0) {
                planesAtTheAirport.push(plainId);
            } else {
                continue;
            }

            if (!cities.has(town)) {
                cities.set(town, new Map([
                    ["arrivals", 0],
                    ["departures", 0],
                    ["plains", []]
                ]));
            }
            if (cities.get(town).get("plains").indexOf(plainId) < 0) {
                cities.get(town).get("plains").push(plainId);
            }
            let currentArr = cities.get(town).get("arrivals");
            cities.get(town).set("arrivals", currentArr + passengerCount);


        } else if (action === "depart") {
            let indexOfPlain = planesAtTheAirport.indexOf(plainId);
            if (indexOfPlain > -1) {
                planesAtTheAirport.splice(indexOfPlain, 1);
                if (cities.has(town)) {
                    let currentDept = cities.get(town).get("departures");
                    cities.get(town).set("departures", currentDept + passengerCount);

                    if (cities.get(town).get("plains").indexOf(plainId) < 0) {
                        cities.get(town).get("plains").push(plainId);
                    }
                } else {
                    cities.set(town, new Map([
                        ["arrivals", 0],
                        ["departures", passengerCount],
                        ["plains", [plainId]]
                    ]))
                }
            }
        }
    }

    console.log("Planes left:");
    planesAtTheAirport.map(a => a = "- " + a)
        .sort((a, b) => a.localeCompare(b))
        .forEach(plane => console.log(plane));

    Array.from(cities.keys()).sort((a, b) => {
        if (!(cities.get(a).get("arrivals") === cities.get(b).get("arrivals"))) {
            return (cities.get(b).get("arrivals") - cities.get(a).get("arrivals"));
        }
        return a.localeCompare(b);
    }).forEach(sortedKey => {
        console.log(sortedKey);
        console.log(`Arrivals: ${cities.get(sortedKey).get("arrivals")}`);
        console.log(`Departures: ${cities.get(sortedKey).get("departures")}`);
        console.log("Planes:");
        cities.get(sortedKey).get("plains").sort((a, b) => {
            return a.localeCompare(b)
        }).forEach(plane =>
            console.log(`-- ${plane}`))
    })
}

airPortApp(["RTA72 London 140 land",
    "RTA72 Brussels 240 depart",
    "RTA72 Sofia 450 land",
    "RTA72 Lisbon 240 depart",
    "RTA72 Berlin 350 land",
    "RTA72 Otava 201 depart",
    "RTA72 Haga 350 land",
    "RTA72 Otava 201 depart",
    "RTA72 Dortmund 150 land",
    "RTA72 Montana 243 depart",
    "RTA72 Monreal 350 land",
    "RTA72 NewYork 201 depart",
    "RTA72 Pekin 350 land",
    "RTA72 Tokyo 201 depart",
    "RTA72 Warshaw 350 land",
    "RTA72 Riga 201 depart"]);