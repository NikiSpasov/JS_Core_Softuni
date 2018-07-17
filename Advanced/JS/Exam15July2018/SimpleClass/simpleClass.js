class BookCollection  {
    constructor(shelfGenre, room, capacity){
        this.validateRoom(room);
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelf = [];
        this.shelfCapacity = capacity;

    }

    validateRoom(room){
        if (room !== "livingRoom" && room !== "bedRoom" && room !== "closet" ) {
            throw new Error(`Cannot have book shelf in ${room}`)
        }
    }

    get shelfCondition(){
        return this.shelfCapacity - this.shelf.length;
    }

    shaveIsFull(){
            return this.shelfCondition === 0
    }

    addBook(bookName, bookAuthor, genre) {
        let currentBook = {
            bookName,
            bookAuthor,
            genre
        };
        if (this.shelfCondition === 0) {
            this.shelf.shift();
        }
        this.shelf.push(currentBook);
    }

    throwAwayBook(bookName){
        if (this.shelfCondition() === 0) {
            let searchedBook = this.shelf.filter(b =>b.bookName === bookName)[0];
            this.shelf.delete(searchedBook);
        }


    }

    showBooks(genre){
        let searchedBook = this.shelf.filter(b =>b.genre === genre);
        let sortedShelf = searchedBook.sort((a,b) => a.bookAuthor.localeCompare(b.bookAuthor));
        let result =`Results for search "${genre}":`;
        for (let book of sortedShelf) {
            result += `\n\uD83D\uDCD6 ${book.bookAuthor} – "${book.bookName}"`
        }
        return result;
    }

    toString(){
        if (this.shelf.length === 0) {
            return "It's an empty shelf";
        }
        let result = `${this.shelfGenre} shelf in {room} contains:`;

        let sortedShelf = this.shelf.sort((a,b) => a.bookAuthor.localeCompare(b.bookAuthor));

        for (let book of sortedShelf) {
            result += `\n\uD83D\uDCD6 "${book.bookName}" – ${book.bookAuthor}`
        }
        return result;
    }
}
let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");

console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));



