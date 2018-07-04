function printDeckOfCards(deck) {
        let newDeck = [];
        let card, face, suit;

        for (let card of deck) {
            try {
                face = card.substr(0, card.length - 1);
                suit = card[card.length - 1];
                card = makeCard(face, suit);
                newDeck.push(card);

            }catch (e) {
                console.log(`Invalid card: ${face+suit}`)
                return;
            }
        }
    console.log(newDeck.join(", "));
 


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
}
printDeckOfCards(['5S', '3D', 'QD', '1C']);