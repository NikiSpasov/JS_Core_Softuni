//1. Split a String with a Delimiter
function splitByDelimeter(string, delimeter) {
    string.split(delimeter).forEach(s => console.log(s))
}

//2. Repeat a String N Times
function repeatStrNTimes(str, numToRepat) {
    console.log(str.repeat(numToRepat));
}

//03. Starts With
function checkForTheSubstr(mainstr, substr) {
    mainstr.indexOf(substr) === 0 ? console.log("true")
        : console.log("false")

}
checkForTheSubstr("Asen", "A")

//04. Ends With
function checkForTheEnd(mainstr, substr) {
        let result = mainstr.length - substr.length;
        mainstr.lastIndexOf(substr) === result ? console.log("true") :
            console.log("false")
}

//05. Capitalize the Words
function capitalizeWords(stringWords) {
    console.log(stringWords.split(" ").map(k => {
        let firstCapital = k[0].toUpperCase();
        let otherWords = k.slice(1, k.length).toLowerCase();
        return firstCapital.concat(otherWords);
    }).join(" "));
}

//06. Capture the Number
function findNums(arrStr) {
    let result = [];
    for (let str of arrStr) {
        let reg = new RegExp(/\d+/, "g");
        if (reg.test(str)) {
            let nums = str.match(reg);
            for (let num of nums) {
                result.push(num);
            }
        }
    }
    console.log(result.join(" "));
}

//7. Find Variable Names in Sentences
function varNamesInSentence(str) {
    let result = [];
    let regex = new RegExp(/_(\w+)/, 'g');
    let match = regex.exec(str);
    while (match) {
        result.push(match[1]);
        match = regex.exec(str);
    }

    console.log(result.join(","));
}

//08. Word Occurences
function wordOccurences(strToCheck, word) {
    let regex = new RegExp(`\\b${word}\\b`, "gi");
    try {
        let match = strToCheck.match(regex).length;
        console.log(match);
    }
    catch (e) {
        console.log(0);
    }
}

//09. Extract Links
function extractLinks(arrStr) {
    let regex = new RegExp(/www\.[0-9A-Za-z-]+\.[.a-z]+/, "g");
    let allText = arrStr.join(" ");
    let match = regex.exec(allText);
    while (match) {
        console.log(match[0]);
        match = regex.exec(allText);
    }
}

extractLinks([
    "Join WebStars now for free, at www.w%%^eb-stars.com",
    "You can also support our partners:",
]);

//10. To-do