"use strict";

//1. Towns to JSON
function townsToJSON(arr) {
    let result = [];
    for (t of arr.slice(1)) {
        let [town, latitude, longitude] = t.split(/\s*\|\s*/)
            .filter(s => s !== "");
        let currentObject = {
            Town: town,
            Latitude: Number(latitude),
            Longitude: Number(longitude)
        };
        result.push(currentObject);
    }
    console.log(JSON.stringify(result));

    // let townsArr = [];
    // for (let town of arr.slice(1)) {
    //     let [empty, townName, lat, lng] =
    //         town.split(/\s*\|\s*/);
    //     let townObj = { Town: townName, Latitude:
    //             Number(lat), Longitude: Number(lng) };
    //     townsArr.push(townObj);
    // }
    // console.log(JSON.stringify(townsArr));
}

//2. ScoreToHTML
function scoreToHTML(arrOfObj) {

    arrOfObj = JSON.parse(arrOfObj);

    let result = "<table>\n" +
        "  <tr><th>name</th><th>score</th></tr>\n";

    for (let item of arrOfObj) {
        let name = escapeChars(item['name']);
        let score = item['score'];
        result += `  <tr><td>${name}</td><td>${score}</td></tr>\n`
    }

    result += "</table>\n";
    console.log(result);


    //ver. 2:
    // let html = "<table>\n";
    // html += "  <tr><th>name</th><th>score</th></tr>\n";
    // let arr = JSON.parse(arrOfObj);
    // for (let obj of arr){
    //     html += `  <tr><td>${escapeChars(obj['name'])}` +
    //         `</td><td>${obj['score']}</td></tr>\n`;}
    // console.log(html + "</table>");

    function escapeChars(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

//                  !!!For object keys => Object.keys(obj)!!!

//3. JSON to HTML Table
function JSONtoHTML(strArr) {
    let objects = JSON.parse(strArr);
    let table = "<table>\n";
    table += "  <tr>";
    Object.keys(objects[0]).forEach(k => table += `<th>${k}</th>`);
    table += "</tr>\n";

    for (let obj of objects) {
        table += "    <tr>";
        Object.entries(obj).forEach(([key, value]) => {
            table += (`<td>${escapeChars(value.toString())}</td>`);
        });
        table += "</tr>\n"
    }
    table += "</table>";
    console.log(table);

    function escapeChars(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

//4. Sum by Town

function sumByTown(arrOfStrings) {
    let result = {};
    for (let i = 0; i < arrOfStrings.length; i += 2) {
        if (i % 2 === 0) {
            let [townName, income] = [arrOfStrings[i], Number(arrOfStrings[i + 1])];
            //or result[townName === undefined]
            if (!result.hasOwnProperty(townName)) {
                result[townName] = income;
            }
            else {
                result[townName] += income;
            }
        }
    }
    console.log(JSON.stringify(result));
}

//5. Count Words In A Text
function countWords(string) {

    let result = {};
    for (let word of string[0].split(/\W+/)) {
        if (word.match(/\w+/)) {
            if (result.hasOwnProperty(word)) {
                result[word]++;
                continue;
            }
            result[word] = 1;
        }
    }
    console.log(JSON.stringify(result));
}

//!!!!MAPS!!!!!

let myMap = new Map(
    [
        ["Pesho", "Gender"],
        ["Gosho", "Gay"]
    ]);

myMap.set("Peter", "Man");
myMap.set("Ani", "Girl");

// console.log(myMap.get("Peter"));//Man
// console.log(myMap);//Map { 'Peter' => 'Man' }
// console.log(typeof myMap);//object
// console.log(myMap.entries());
// console.log(Array.from(myMap.keys()));//[ 'Pesho', 'Gosho', 'Peter', 'Ani' ]
// console.log(Array.from(myMap.values()));//[ 'Gender', 'Gay', 'Man', 'Girl' ]

//06. Count Words with Maps

function countWordsWithMaps(arr) {
    let result = new Map();
    let words = arr[0].toLowerCase().split(/\W+/).filter(w => w !== "");
    for (let w of words) {
        result.has(w) ? result.set(w, result.get(w) + 1) : result.set(w, 1);
    }
    let allWords = Array.from(result.keys()).sort();
    allWords.forEach(w => console.log(`'${w}' -> ${result.get(w)} times`));
}

//07. Population in Towns

function populationInTowns(strArr) {

    let populationTown = new Map();

    for (let str of strArr) {
        let [town, population] = str.split(/\s*<->\s*/);
        population = Number(population);
        populationTown.has(town) ? populationTown.set(town, populationTown.get(town) + population) :
            populationTown.set(town, population);
    }
    //sorting keys:
    //let arrFromKeys = Array.from(populationTown.keys()).sort();
    // arrFromKeys.forEach(((v, k) => console.log(v + " : " + populationTown.get(v))));

    //without sortingkeys:
    for (let [key, value] of populationTown) {
        console.log(`${key} : ${value}`);
    }
}

//CHECK THIS FOR SORTING BY VALUES
/**
 * Sort object properties (only own properties will be sorted).
 * @param {object} obj object to sort properties
 * @param {string|int} sortedBy 1 - sort object properties by specific value.
 * @param {bool} isNumericSort true - sort object properties as numeric value, false - sort as string value.
 * @param {bool} reverse false - reverse sorting.
 * @returns {Array} array of items in [[key,value],[key,value],...] format.
 */
// function sortProperties(obj, sortedBy, isNumericSort, reverse) {
//     sortedBy = sortedBy || 1; // by default first key
//     isNumericSort = isNumericSort || false; // by default text sort
//     reverse = reverse || false; // by default no reverse
//
//     var reversed = (reverse) ? -1 : 1;
//
//     var sortable = [];
//     for (var key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             sortable.push([key, obj[key]]);
//         }
//     }
//     if (isNumericSort)
//         sortable.sort(function (a, b) {
//             return reversed * (a[1][sortedBy] - b[1][sortedBy]);
//         });
//     else
//         sortable.sort(function (a, b) {
//             var x = a[1][sortedBy].toLowerCase(),
//                 y = b[1][sortedBy].toLowerCase();
//             return x < y ? reversed * -1 : x > y ? reversed : 0;
//         });
//     return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
// }
// Exemple :
//
//     var cities = {
//         'first city': {
//             name: 'First City',
//             sort: 10
//         },
//         'second city': {
//             name: 'Second City',
//             sort: 14
//         },
//         'third city': {
//             name: 'Third City',
//             sort: 20
//         },
//         'fourth city': {
//             name: 'Fourth City',
//             sort: 2
//         }
//     };
// sortProperties(cities, 'sort', true, false);
// @ForgeableSum
// ForgeableSum commented on Dec 12, 2016
// Neat function. And if you need to convert that array back into an object, simply do this:
//
// function sortObjects(objects) {
//
//     var newObject = {};
//
//     var sortedArray = sortProperties(objects, 'zindex', true, false);
//     for (var i = 0; i < sortedArray.length; i++) {
//         var key = sortedArray[i][0];
//         var value = sortedArray[i][1];
//
//         newObject[key] = value;
//
//     }
//
//     return newObject;
//
// }

//8. City Markets
function cityMarkets(arr) {
    let markets = new Map();
    for (let row of arr) {
        let [town, prod] = row.split(" -> ").slice(0, 2);
        let [amountOfSales, priceForOneUnit] = row.split(" -> ").slice(2, 3).join(" : ").split(" : ");
        let sum = Number(amountOfSales) * Number(priceForOneUnit);
        markets.has(town) ? markets.get(town).set(prod, sum) :
            markets.set(town, new Map([[prod, sum]]));
    }
    for (let [k, v] of markets) {
        console.log(`Town - ${k}`);
        for (let [sum, item] of v) {
            console.log(`$$$${sum} : ${item}`);
        }
    }
}

//9. Lowest Prices in Cities
function lowestPriceInCities(input) {

    let myMap = extractData();

    let result = '';
    for (let [product, values] of myMap) {
        let selection = [...values].sort((a, b) => a[1] - b[1])[0];
        let town = selection[0];
        let price = selection[1];
        result += `${product} -> ${price} (${town})\n`
    }
    console.log(result.trim());

    function extractData (){
        let myMap = new Map();

        for(const string of input){
            let [town, product, price] = string.split(" | ") ;

            if (!myMap.get(product)) {
                myMap.set(product, new Map())
            }
            //check for lower price!
            myMap.get(product).set(town, Number(price))
        }
        return myMap;
    }
}

lowestPriceInCities(["Sofia City | Audi | 100000",
    "Sofia City | BMW | 100000",
    "Sofia City | Mitsubishi | 10000",
    "Sofia City | Mercedes | 10000",
    "Sofia City | NoOffenseToCarLovers | 0",
    "Mexico City | Audi | 1000",
    "Mexico City | BMW | 99999",
    "New York City | Mitsubishi | 10000",
    "New York City | Mitsubishi | 1000",
    "Mexico City | Audi | 100000",
    "Washington City | Mercedes | 1000"]);


//10. Extract Unique Words
function extractUniqueWord(arrOfStr) {
    let set = new Set();

    for (let row of arrOfStr) {
        let words = row.split(/[^A-Za-z0-9_]/).filter(s => s !== "");
        for (let word of words) {
            set.add(word.toLowerCase());
        }
    }
    console.log([...set].join(', '));
}

//let testObj = {obj2:{value: 2}, obj1:{value: 1}, obj3:{value: 3}};

//SORTING nested objects by nested
//by obj value/change '[k]/[v]' if you want to reverse order!/:

// Object.keys(testObj)
//     .sort((k, k1) => testObj[k].value - testObj[k1].value).forEach(
//         k => console.log(k + " -> " + JSON.stringify(testObj[k])));


//     let testMap = new Map([
//         ["firstKey", new Map([["fk", 1]])],
//         ["thirdKey", new Map([["td", 3]])],
//         ["secondKey", new Map([["sc", 2]])]
//         ]);
//
//     let a = testMap.get("firstKey");
//
// console.log(a);
// console.log(a.keys());
//
// let obj = Array.from(a.keys);
// console.log(obj);
//
//         Array.from(testMap.keys())
//             .sort((k1, k2) =>{
//                 return testMap.get(k1) - testMap.get(k2)})
//             .forEach(k => console.log(k + " -> " + [...testMap.get(k)]));
