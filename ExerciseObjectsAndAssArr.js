//1. Heros Inventory
function heroes(arrStr) {

    let result = [];

    for (let token of arrStr) {
        let [name, level, items] = token.trim().split(" / ");
        if (items !== undefined) {
            items = items.trim().split(", ");
        } else {
            items = [];
        }
        level = Number(level);
        let currentObj = {
            "name": name,
            "level": level,
            "items": items
        };

        result.push(currentObj);
    }
    console.log(JSON.stringify(result));
}

//2. JSON Table
function JSONTable(arrStr) {
    let result = "<table>\n";
    for (let token of arrStr) {
        let obj = JSON.parse(token);
        result += "\t<tr>\n";
        result += `\t\t<td>${obj.name}</td>\n`;
        result += `\t\t<td>${obj.position}</td>\n`;
        result += `\t\t<td>${obj.salary}</td>\n`;
        result += "\t<tr>\n";
    }
    result += "</table>";
    console.log(result);
}

//3. Cappy Juice
function cappyJuice(arrStr) {
    let result = {};
    let mapWithBottles = new Map();

    for (let token of arrStr) {
        let [juice, quantity] = token.split(" => ");
        quantity = Number(quantity);
        if (result.hasOwnProperty(juice)) {
            result[juice] += quantity;
            result[juice] = makeBottle();
            continue;
        }
        result[juice] = quantity;
        result[juice] = makeBottle();

        function makeBottle() {
            if (result[juice] < 1000) {
                return result[juice];
            }
            let bottleCount = Math.floor(result[juice] / 1000);
            if (mapWithBottles.has(juice)) {
                let currentCount = mapWithBottles.get(juice);
                mapWithBottles.set(juice, currentCount + bottleCount);
            }
            else {
                mapWithBottles.set(juice, bottleCount);
            }
            return result[juice] % 1000;
        }
    }
    for (let [key, value] of mapWithBottles) {
        console.log(key + " => " + value);
    }
}

//4. Store Catalogue
function storageCatalog(arrStr) {

    let obj = {}, result;
    for (let token of arrStr) {
        let [item, price] = token.split(" : ");
        let letterKey = item[0];
        if (obj.hasOwnProperty(letterKey)) {
            obj[letterKey].push(`{${item}: ${price}}`);
            continue;
        }
        obj[letterKey] = [`{${item}: ${price}}`];
    }
    Object.keys(obj).sort().forEach(function (k) {
        console.log(k);
        for (let val of Object.values(obj[k]).sort()) {
            val = val.slice(1, val.length - 1);
            console.log("  " + val);
        }
    });
}

//5. Auto-Engineering Company 
function autoEngineering(arrStr) {
    let myMap = new Map();

    for (let token of arrStr) {
        let [brand, model, countProduced] = token.trim().split(" | ");
        countProduced = Number(countProduced);
        if (myMap.has(brand)) {
            if (myMap.get(brand).has(model)) {
                let sum = myMap.get(brand).get(model) + countProduced;
                myMap.get(brand).set(model, sum);
                continue;
            }
            myMap.get(brand).set(model, countProduced);
            continue;
        }
        let currentMap = new Map([
            [model, countProduced]
        ]);
        myMap.set(brand, currentMap);
    }

    for (let [k, v] of myMap) {
        console.log(k);
        for (let [key, val] of v) {
            console.log(`###${key} -> ${val}`);
        }
    }
}

//06. System Components
function systemComponents(arrStr) {

    //let's fill it:
    let myMap = new Map();

    for (let token of arrStr) {
        let [systemName, componentName, subcomponentName] = token.trim().split(" | ");
        if (myMap.has(systemName)) {
            if (myMap.get(systemName).has(componentName)) {
                let arrToSet = myMap.get(systemName).get(componentName);
                arrToSet.push(subcomponentName);
                myMap.get(systemName).set(componentName, arrToSet);
                continue;
            }
            myMap.get(systemName).set(componentName, [subcomponentName]);
            continue;
        }
        let currentMap = new Map([
            [componentName, [subcomponentName]]
        ]);
        myMap.set(systemName, currentMap);
    }

    //let's print it:
    let result = "";
    let sortedKeys = Array.from(myMap.keys())
        .sort(function (a, b) {
            let aSize = myMap.get(a).size;
            let bSize = myMap.get(b).size;
            if (aSize !== bSize) {
                return aSize < bSize;
            }
            return a > b;
        });
    for (let i = 0; i < sortedKeys.length; i++) {
        let currentMap = myMap.get(sortedKeys[i]);
        currentMap[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => b[1].length - a[1].length);
        };
        result += sortedKeys[i] + "\n";
        for (let [k, v] of currentMap) {

            result += `|||${k}\n`;
            v.forEach(a => result += `||||||${a}\n`)
        }
    }
    console.log(result);
}

//7. Usernames

function usernames (arrStr) {

    let setOfNames = new Set();
    for (let name of arrStr) {
        setOfNames.add(name)
    }

    Array.from(setOfNames).sort((a, b) => a.length - b.length || a.localeCompare(b)).forEach(a => console.log(a));
}

//8. Unique Sequences

function uniqueSequence (arrs) {
    let myMap = new Map();
    arrs.map(a => JSON.stringify(a));
    for (let arr of arrs) {
        let arrLength = arr.length;
        arr.sort((a, b) => b - a);

        myMap.set(arrLength, new Set(arr));
    }
    Array.from(myMap.keys())
        .sort((a,b) => a-b)
        .forEach( k =>
            console.log(Array.from(myMap.get(k)))
        );
}
uniqueSequence([
    [-3, -2, -1, 0, 1, 2, 3, 4],
    [10, 1, -17, 0, 2, 13],
    [4, -3, 3, -2, 2, -1, 1, 0]
]);