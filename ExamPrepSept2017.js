"use strict";

//Problem 1 – The Hungry Programmer
function hungryProgr(mealsArr, commArr) {

    let eaten = 0;

    for (let command of commArr) {
        let commandArgs = command.split(" ");
        switch (commandArgs[0]) {

            case "Serve":
                if (mealsArr.length > 0) {
                    console.log(`${mealsArr.pop()} served!`);
                }
                break;

            case "Eat":
                if (mealsArr.length === 0) {
                    break;
                }

                eaten++;
                console.log(`${mealsArr[0]} eaten`);
                mealsArr.shift();
                break;

            case "Add":
                let newMeal = commandArgs.splice(1, commandArgs.length - 1).join(" ");
                if (newMeal) {
                    mealsArr.unshift(newMeal);
                }

                break;

            case "Shift":
                let [firstInd, secIndex] = commandArgs.splice(1, 2);
                if (firstInd === undefined || secIndex === undefined) {
                    break;
                }
                if ((firstInd >= 0 && firstInd < mealsArr.length) && (secIndex >= 0 && secIndex < mealsArr.length && secIndex >= firstInd)
                    && firstInd !== secIndex) {
                    let a = mealsArr[firstInd];
                    let b = mealsArr[secIndex];
                    mealsArr[secIndex] = a;
                    mealsArr[firstInd] = b;
                }
                break;

            case "Consume":
                let [startIndex, endIndex] = commandArgs.slice(1, commandArgs.length);

                if (startIndex === undefined || endIndex === undefined) {
                    break;
                }


                if (startIndex < mealsArr.length && endIndex <= mealsArr.length && endIndex >= startIndex) {
                    mealsArr.splice(startIndex, (endIndex - startIndex + 1));
                    eaten += endIndex - startIndex + 1;
                    console.log("Burp!");
                }
                break;

            case "End":
                mealsArr.length === 0 ? console.log("The food is gone")
                    : console.log(`Meals left: ${mealsArr.join(", ")}`);
                console.log(`Meals eaten: ${eaten}`);
                return;

        }

    }
    mealsArr.length === 0 ? console.log("The food is gone")
        : console.log(`Meals left: ${mealsArr.join(", ")}`);
    console.log(`Meals eaten: ${eaten}`);
}

//Problem 2 – Expedition
function expedition(primary, secondary, targets, startingPoint) {
    let steps = 1;
    let primaryMatrixRows = primary.length;
    let primaryMatrixCols = primary[0].length;
    let secondaryMatrixRows = secondary.length;
    let secondaryMatrixCols = secondary[0].length;

    for (let target of targets) {
        modifyPrimary(target);
    }

    let currentPosition = [startingPoint[0], startingPoint[1]];
    let previousDirection;

    while (true) {
        if (currentPosition[0] + 1 < primaryMatrixRows && primary[currentPosition[0] + 1][currentPosition[1]] == 0 && previousDirection != "up") {
            currentPosition = [currentPosition[0] + 1, currentPosition[1]];
            previousDirection = "down";
        } else if (currentPosition[1] + 1 < primaryMatrixCols && primary[currentPosition[0]][currentPosition[1] + 1] == 0 && previousDirection != "left") {
            currentPosition = [currentPosition[0], currentPosition[1] + 1];
            previousDirection = "right";
        } else if (currentPosition[0] > 0 && primary[currentPosition[0] - 1][currentPosition[1]] == 0 && previousDirection != "down") {
            currentPosition = [currentPosition[0] - 1, currentPosition[1]];
            previousDirection = "up";
        } else if (currentPosition[1] > 0 && primary[currentPosition[0]][currentPosition[1] - 1] == 0 && previousDirection != "right") {
            currentPosition = [currentPosition[0], currentPosition[1] - 1];
            previousDirection = "left";
        } else {
            break;
        }
        steps++;
    }

    console.log(steps);
    definePosition(currentPosition);

    function modifyPrimary(coordinates) {
        let row = Number(coordinates[0]);
        let col = Number(coordinates[1]);
        for (let i = 0; i < secondaryMatrixRows; i++) {
            if (i + row < primaryMatrixRows) {
                for (let j = 0; j < secondaryMatrixCols; j++) {
                    if (primary[i + row][j + col] != undefined && secondary[i][j] == 1) {
                        primary[i + row][j + col] = primary[i + row][j + col] == 0 ? 1 : 0;
                    }
                }
            }
        }
    }

    function definePosition(currentPosition) {
        let currentRow = currentPosition[0];
        let currentCol = currentPosition[1];
        if (currentRow == 0) {
            console.log("Top");
        } else if (currentRow == primaryMatrixRows - 1) {
            console.log("Bottom");
        } else if (currentCol == 0) {
            console.log("Left");
        } else if (currentCol == primaryMatrixCols - 1) {
            console.log("Right");
        } else if (currentRow < primaryMatrixRows / 2 && currentCol >= primaryMatrixCols / 2) {
            console.log("Dead end 1");
        } else if (currentRow < primaryMatrixRows / 2 && currentCol < primaryMatrixCols / 2) {
            console.log("Dead end 2");
        } else if (currentRow >= primaryMatrixRows / 2 && currentCol < primaryMatrixCols / 2) {
            console.log("Dead end 3");
        } else if (currentRow >= primaryMatrixRows / 2 && currentCol >= primaryMatrixCols / 2) {
            console.log("Dead end 4");
        }
    }
}

//Problme 3 - Lost
function solve(keyword, text) {
    let pattern = /(north|east)\D*(\d{2})[^,]*(,)\D*(\d{6})/gi;
    let messagePattern = new RegExp(`(${keyword})(.*?)(${keyword})`, 'g');
    let message = messagePattern.exec(text)[2];

    let latOutput = '';
    let longOutput = '';
    let match = pattern.exec(text);
    while (match) {
        if (match[1].toLowerCase() === 'north') {
            latOutput = `${match[2]}.${match[4]} N`;
        } else {
            longOutput = `${match[2]}.${match[4]} E`;
        }
        match = pattern.exec(text);
    }

    console.log(latOutput);
    console.log(longOutput);
    console.log(`Message: ${message}`);
}

function restHouse(roomsObjArr, guestsObjArr) {

    let homeless = 0;

    roomsObjArr.forEach(room => {
        room["guests"] = [];
        room["freeBeds"] = room["type"] === "double-bedded" ? 2 : 3;
    });

    roomsObjArr.map(room => room["number"] = room["number"]);


    for (let guestPair of guestsObjArr) {


        if ((guestPair["first"]["gender"] === guestPair["second"]["gender"])) {

                for (let guest in guestPair) {
                    let currentGuest = {
                        "name": guestPair[guest]["name"],
                        "age": guestPair[guest]["age"],
                        "gender": guestPair[guest]["gender"]
                    };
                    accomodateGuest(currentGuest);
                }

        } else {
            let firstFreeRoom = roomsObjArr.filter(r => r["type"] === "double-bedded").filter(r => r["guests"].length === 0)[0];
            if (firstFreeRoom) {
                for (let guest in guestPair) {
                    let currentGuest = {
                        "name": guestPair[guest]["name"],
                        "age": guestPair[guest]["age"],
                        "gender": guestPair[guest]["gender"]
                    };
                    firstFreeRoom["guests"].push(currentGuest);
                }
                firstFreeRoom["freeBeds"] = 0;
            }
            else {
                homeless += 2;
            }
        }
    }

    function accomodateGuest(guest) {

        let firstFreeTripleRoom = roomsObjArr
            .filter(r => r["type"] === "triple")
            .filter(r => r["freeBeds"] === 3)[0];

        let arrFromTripleRoomsWithFreeBeds = roomsObjArr
            .filter(r => r["type"] === "triple")
            .filter(r => r["freeBeds"] < 3)
            .filter(r => r["freeBeds"] > 0);

        let currentGuest = {
            "name": guest["name"],
            "age": guest["age"],
            "gender": guest["gender"]
        };

        if (arrFromTripleRoomsWithFreeBeds.length > 0) {
            for (let tripleRoomWithFreeBed of arrFromTripleRoomsWithFreeBeds) {
                if (tripleRoomWithFreeBed["guests"][0]["gender"] === currentGuest["gender"]) {
                    tripleRoomWithFreeBed["guests"].push(currentGuest);
                    tripleRoomWithFreeBed["freeBeds"]--;
                    return;
                }
            }

            if (firstFreeTripleRoom) {
                firstFreeTripleRoom["guests"].push(currentGuest);
                firstFreeTripleRoom.freeBeds -= 1;
            } else {
                homeless++;
            }
        } else if (firstFreeTripleRoom) {
            firstFreeTripleRoom["guests"].push(currentGuest);
            firstFreeTripleRoom.freeBeds -= 1;
        } else {
            homeless++;
        }
    }
    let sortedNums = Array.from(Object.values(roomsObjArr)).sort((a, b) => a["number"] > b["number"]);

    for (let room of sortedNums) {
        console.log(`Room number: ${room["number"]}`);

        room["guests"].sort((a, b) => a["name"] > b["name"]).forEach(guest => {
            console.log(`--Guest Name: ${guest.name}`);
            console.log(`--Guest Age: ${guest.age}`);
        });
        console.log(`Empty beds in the room: ${room.freeBeds}`)

    }

    console.log(`Guests moved to the tea house: ${homeless}`);
}

//check the author's solution:

function restHouse(availableRooms, guests) {
    let rooms = new Map();
    let guestsWithoutRooms = 0;
    for (let currentRoom of availableRooms) {
        let roomSpace = currentRoom.type === 'double-bedded' ? 2 : 3;
        rooms.set(currentRoom.number, { type: currentRoom.type, emptyBeds: roomSpace });
    }
    for (let currentPair of guests) {
        let roomFound = false;
        if (currentPair.first.gender !== currentPair.second.gender) {
            for (let [key, value] of rooms) {
                if (value.type === 'double-bedded' && value.emptyBeds === 2) {
                    value.guests = [];
                    value.guests = [currentPair.first, currentPair.second];
                    value.emptyBeds = 0;
                    roomFound = true;
                    break;
                }
            }
        } else {
            for (let [key, value] of rooms) {
                if (value.type === 'triple' && value.emptyBeds > 1) {
                    if (value.guests === undefined) {
                        value.guests = [];
                    } else if (value.guests[0].gender !== currentPair.second.gender) {
                        continue;
                    }
                    if (currentPair.first !== undefined) {
                        value.guests.push(currentPair.first);
                        value.emptyBeds -= 1;
                    }
                    value.guests.push(currentPair.second);
                    value.emptyBeds -= 1;
                    roomFound = true;
                    break;
                } else if (value.type === 'triple' && value.emptyBeds == 1) {
                    if (value.guests[0].gender === currentPair.second.gender) {
                        value.guests.push(currentPair.first === undefined ? currentPair.second : currentPair.first);
                        value.emptyBeds -= 1;
                        currentPair.first = undefined;
                    }
                }
            }
        }
        if (!roomFound) {
            guestsWithoutRooms += currentPair.first === undefined ? 1 : 2;
        }
    }
    for (let [room, value] of [...rooms].sort()) {
        console.log(`Room number: ${room}`);
        if (value.guests !== undefined) {
            for (let guest of value.guests.sort(function (a, b) {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })) {
                console.log(`--Guest Name: ${guest.name}`);
                console.log(`--Guest Age: ${guest.age}`);
            }
        }
        console.log(`Empty beds in the room: ${value.emptyBeds}`);
    }
    console.log(`Guests moved to the tea house: ${guestsWithoutRooms}`);
}

restHouse(
    [
        {"number":"97","type":"triple"},
        {"number":"600","type":"double-bedded"},
        {"number":"924","type":"triple"},
        {"number":"242","type":"double-bedded"},
        {"number":"346","type":"double-bedded"},
        {"number":"537","type":"triple"},
        {"number":"161","type":"triple"},
        {"number":"46","type":"double-bedded"},
        {"number":"428","type":"triple"},
        {"number":"584","type":"double-bedded"},
        {"number":"34","type":"double-bedded"},
        {"number":"636","type":"triple"},
        {"number":"963","type":"double-bedded"}
    ],
    [
        {"first":{"name":"Laurie Montgomery","gender":"female","age":16},"second":{"name":"Sadie Carson","gender":"female","age":29}},
        {"first":{"name":"Erin Moreno","gender":"female","age":69},"second":{"name":"Beth Foster","gender":"female","age":48}},
        {"first":{"name":"Georgia Thomas","gender":"female","age":38},"second":{"name":"Freddie Harmon","gender":"male","age":46}},
        {"first":{"name":"Alexis Graham","gender":"female","age":19},"second":{"name":"Marco Arnold","gender":"male","age":4}},
        {"first":{"name":"Freddie Harmon","gender":"male","age":30},"second":{"name":"Jesus Terry","gender":"male","age":64}},
        {"first":{"name":"Nina Diaz","gender":"female","age":29},"second":{"name":"Carol Hansen","gender":"female","age":6}},
        {"first":{"name":"Tracy Reid","gender":"male","age":41},"second":{"name":"Jordan Garner","gender":"male","age":16}},
        {"first":{"name":"Kara Burns","gender":"female","age":7},"second":{"name":"Marjorie Butler","gender":"female","age":28}},
        {"first":{"name":"Ismael Wagner","gender":"male","age":4},"second":{"name":"Claude Schneider","gender":"male","age":63}},
        {"first":{"name":"Ashley Mcguire","gender":"female","age":31},"second":{"name":"Melody Gill","gender":"female","age":38}},
        {"first":{"name":"Joyce Roy","gender":"female","age":41},"second":{"name":"Miguel Kelly","gender":"male","age":23}},
        {"first":{"name":"Chelsea Wilkins","gender":"female","age":59},"second":{"name":"Marianne Boone","gender":"female","age":18}},
        {"first":{"name":"Lori Griffin","gender":"female","age":11},"second":{"name":"Byron Love","gender":"male","age":58}},
        {"first":{"name":"Carol Hansen","gender":"female","age":0},"second":{"name":"Christine Page","gender":"female","age":45}},
        {"first":{"name":"Ronnie Floyd","gender":"male","age":51},"second":{"name":"Steven Todd","gender":"male","age":6}},
        {"first":{"name":"Eva Reyes","gender":"female","age":2},"second":{"name":"Joyce Roy","gender":"female","age":43}},
        {"first":{"name":"Rochelle Sandoval","gender":"female","age":67},"second":{"name":"Matthew Rodriquez","gender":"male","age":36}},
        {"first":{"name":"Malcolm Bishop","gender":"male","age":58},"second":{"name":"Sergio Ferguson","gender":"male","age":0}},
        {"first":{"name":"Essie Stone","gender":"female","age":35},"second":{"name":"Keith Sutton","gender":"male","age":58}},
        {"first":{"name":"Mary Gregory","gender":"female","age":18},"second":{"name":"Marco Arnold","gender":"male","age":44}},
        {"first":{"name":"Tom Dennis","gender":"male","age":15},"second":{"name":"Jim Graham","gender":"male","age":63}}
    ]
);
