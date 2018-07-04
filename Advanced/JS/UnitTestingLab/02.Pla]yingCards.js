function makeCard(faceInput, suitInput) {

    const validFaces = ["2", "3", "4","5","6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const validSuits = ["S", "H", "D", "C"];
    if (!validFaces.includes(faceInput)) {
        throw new Error("Invalid car face " + faceInput)
    }
    if (!validSuits.includes(suitInput)) {
        throw new Error("Invalid card suit " + suitInput)
    }

    let card = {
        face: faceInput,
        suit: suitInput,
        toString: () => {
            let converted = { S: "\u2660", H: "\u2665", D: "\u2666", C: "\u2663" };
            return card.face + converted[`${card.suit}`];
        }
    };
    return card;
}

let card = makeCard("A", "S");
console.log(card.toString());
