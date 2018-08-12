handlers.getMyReceipts = function (ctx) {

    const userId = sessionStorage.getItem('userId');

    receiptService.getMyReceipts(userId)
        .then((allreceipts) => {
            ctx.username = sessionStorage.getItem('username');
            ctx.receipts = allreceipts;
            ctx.total = allreceipts
                .map(e => +e.total)
                .reduce((a,b) => a + b);

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                receipt: './templates/receipt/receipt.hbs'
            }).then(function () {
               this.partial('./templates/receipt/all-receipts.hbs')
            })
        })
        .catch(notify.showError)
};
handlers.getReceiptDetails = function (ctx) {
    const receiptId = ctx.params.id;
    entriesService.getAllByReceiptId(receiptId)
        .then((entries) => {
            entries.forEach(e => {
                e.subtotal = (e.price * e.quantity).toFixed(2)
            });

            ctx.username = sessionStorage.getItem('username');
            ctx.entries = entries;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                entry: './templates/receipt/entry.hbs'
            }).then(function () {
                this.partial('./templates/receipt/receipt-details.hbs')
            })
        })
        .catch(notify.handleError);
};