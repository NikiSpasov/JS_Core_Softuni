"use strict"

//Problem 1 – The Pyramid of King Djoser
function pyramid(base, increment) {
    let cnt = 1;
    let totalMarbel = 0;
    let totalStones = 0;
    let totalLapisLazuli = 0;

    while (base > 2) {
        let totalBase = base * base;
        let innerBase = (base - 2) * (base - 2);
        totalStones += innerBase * increment;
        let decoration = (totalBase - innerBase) * increment;

        cnt % 5 !== 0 ? totalMarbel += decoration : totalLapisLazuli += decoration;
        base -= 2;
        cnt++;
    }

    let gold = base % 2 === 0 ? 2 * (2 * increment) : increment;
    let finalPyramidHeight = cnt * increment;

    console.log(`Stone required: ${Math.ceil(totalStones)}\nMarble required: ${Math.ceil(totalMarbel)}\nLapis Lazuli required: ${Math.ceil(totalLapisLazuli)}\nGold required: ${Math.ceil(gold)}\nFinal pyramid height: ${Math.floor(finalPyramidHeight)}`
    );
}

//02. Jan's Notation

function calc(inputArr) {

    let result = 0;
    if (inputArr.length < 3) {
        if (inputArr.length === 0) {
            return;
        }
        let numCount = inputArr.join(" ").match(/\d+/g);
        if (!numCount) {
            console.log("Error: not enough operands!");
            return;

        }
    }
    let numCount = inputArr.join(" ").match(/\d+/g).length;
    let signsCount = inputArr.length - numCount;

    if (numCount - signsCount >= 2) {
        console.log("Error: too many operands!");
        return;
    } else if (numCount <= signsCount) {
        console.log("Error: not enough operands!");
        return;
    }

    while (inputArr.length > 1) {

        for (let index = 0; index < inputArr.length; index++) {

            let token = String(inputArr[index]);
            let numMatch = token.match(/\d+/);
            if (numMatch) {

            } else {
                if (token !== "*" && token !== "/" && token !== "+" && token !== "-") {
                    continue;
                }
                let sign = inputArr.slice(index, index + 1)[0];
                let [opp1, opp2] = inputArr.slice(index - 2, index);

                switch (sign) {
                    case "*":
                        result = opp1 * opp2;
                        break;
                    case "/":
                        result = opp1 / opp2;
                        break;
                    case "-":
                        result = opp1 - opp2;
                        break;
                    case "+":
                        result = opp1 + opp2;
                        break
                }
                inputArr.splice(index - 2, 3, result);
                break;
            }
        }
    }
    console.log(inputArr[0]);
}

//03.Problem 3 – XML Messenger

function messenger(stringMessage) {

    let generalRegex = new RegExp(/^<message.*>.*<\/message>$/gms);
    let regexAtribbute = new RegExp(/\s*[a-z]+="[\w\s\.]+"\s*/);
    let regexSenderMessage = new RegExp(/^<message.*to="([\w\.\s]+)".*?>(.*)<\/message>$/gms);
    let regexRecepientMessage = new RegExp(/^<message.*from="([\w\.\s]+)".*?>(.*)<\/message>$/gms);
    let matchGeneral = generalRegex.exec(stringMessage);
    let matchForSender = regexRecepientMessage.exec(stringMessage);
    let matchForRecepient = regexSenderMessage.exec(stringMessage);

    if (!matchGeneral) {
        console.log("Invalid message format");
        return;
    }

    let attributes = stringMessage
        .match(/[a-z]+="[\w\.\s]+"/gms);

    for (let attribute of attributes) {
        let test = regexAtribbute.test(attribute);
        if (!test) {
            console.log("Invalid message format");
            return;
        }
    }

    if (!(matchForSender) || !(matchForRecepient)) {
        console.log("Missing attributes");
        return;
    }

    let messageArray = matchForSender[2].split('\n');
    let sender = matchForSender[1];
    let recepient = matchForRecepient[1];
    let message = "";
    messageArray.forEach(m => message += `    <p>${m}</p>\n`);

    let result = `<article>\n  <div>From: <span class="sender">${sender}</span></div>\n`;
    result += `  <div>To: <span class="recipient">${recepient}</span></div>\n`;
    result += `  <div>\n`;
    result += message;
    result += `  </div>\n`;
    result += '</article>';

    console.log(result);
}

//messenger('<message from="Hillary" to="Edward" secret:true>VGhpcyBpcyBhIHRlc3Q</message>');

//04. Galactic Elections
function elections(ballots) {

    let election = new Map();

    //fill the map:
    for (let ballot of ballots) {
        if (!election.has(ballot.system)) {
            election.set(ballot.system, new Map())
        }
        if (!election.get(ballot.system).has(ballot.candidate)) {
            election.get(ballot.system).set(ballot.candidate, 0)
        }
        let currentVotes = election.get(ballot.system).get(ballot.candidate);
        election.get(ballot.system).set(ballot.candidate, currentVotes + ballot.votes);
    }

    //get the results in new map:
    let result = new Map();
    [...election].map(([s, c])=>
        [s, [...c].sort((a, b) =>                   // Place candidate with most votes in system in first place
            b[1] - a[1]).reduce((a, b) =>           // Collect all votes into first element (previously sorted)
            [a[0], a[1] + b[1]])])
        .map(([s, [c, v]]) => [c, s, v])    // Change structure from system with candidates to candidate with systems (all that he won)
        .forEach(([c, s, v], i, arr) => result.has(c) ? result.get(c).set(s, v) : result.set(c, new Map([[s, v]])));    // Transfer results to another map

    let ranking = [...result].map(([c, s]) =>
        [c, [...s].map(([s, v]) => v)           // Sum the votes for each candidate
            .reduce((a, b) => a + b)])
        .sort(([c1, v1], [c2, v2]) => v2 - v1); // Sort by number of votes

    // Calculate total turnout (number of votes)
    let total = ranking.map(([c, v]) => v).reduce((a, b) => a + b);

    if (ranking[0][1] > total / 2) {
        console.log(`${ranking[0][0]} wins with ${ranking[0][1]} votes`);
        if (ranking.length > 1) {
            let runnerup = ranking[1][0];
            console.log(`Runner up: ${runnerup}`);
            [...result.get(runnerup)].sort(([s1, v1], [s2, v2]) => v2 - v1).forEach(s => console.log(`${s[0]}: ${s[1]}`))
        } else {
            console.log(`${ranking[0][0]} wins unopposed!`);
        }
    } else {
        console.log(`Runoff between ${ranking[0][0]} with ${Math.floor(ranking[0][1] / total * 100)}% and ${ranking[1][0]} with ${Math.floor(ranking[1][1] / total * 100)}%`);
    }
}

elections([{system: 'Theta', candidate: 'Flying Shrimp', votes: 10},
    {system: 'Sigma', candidate: 'Space Cow', votes: 200},
    {system: 'Sigma', candidate: 'Flying Shrimp', votes: 120},
    {system: 'Tau', candidate: 'Space Cow', votes: 15},
    {system: 'Sigma', candidate: 'Space Cow', votes: 60},
    {system: 'Tau', candidate: 'Flying Shrimp', votes: 150}]
);