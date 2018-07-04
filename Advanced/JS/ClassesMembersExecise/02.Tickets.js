function ticketManager (tickets, criteria) {
    class Ticket {
        constructor (destination, price, status){
            this.destination = destination;
            this.price = Number(Number(price).toString());
            this.status = status;
        }
    }
    let ticketArr = [];
    for (let ticket of tickets) {
        let [destination, price, status] = ticket.split("|");
        ticketArr.push(new Ticket(destination, price, status));
    }

    return ticketArr.sort((a,b) => a[criteria] > b[criteria])
}

console.log(ticketManager(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'));