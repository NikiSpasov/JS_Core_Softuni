handlers.getEditor = async function (ctx) {
    try {
        const userId = sessionStorage.getItem('userId');
        const username = sessionStorage.getItem('username');

        let [receipt] = await receiptService.getActive(userId);
        if (!receipt) {
            receipt = await receiptService.create();
        }
        console.log(receipt._id);

        let entries = await entriesService.getAllByReceiptId(receipt._id);
        if (entries.length > 0) {
            entries.forEach((e) => {
                e.subtotal = (e.quantity * e.price).toFixed(2)
            });
            ctx.productsCount = entries.length;

            ctx.total = entries
                .map(e => +e.subtotal)
                .reduce((a, b) => a + b);

        } else {
            ctx.total = 0;
            ctx.productsCount = 0;
        }

        ctx.entries = entries;
        ctx.receiptId = receipt._id;
        ctx.username = username;

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            checkoutForm: './templates/forms/checkout.hbs',
            entryForm: './templates/forms/entry-form.hbs',
            entry: './templates/editor/entry.hbs'
        }).then(function () {
            this.partial('./templates/editor/editor-page.hbs')
        })
    }
    catch (e) {
        console.log(e);
        notify.handleError(e)
    }
};
handlers.createEntry = function (ctx) {
    const type = ctx.params.type;
    const quantity = ctx.params.quantity;
    const price = ctx.params.price;
    const receiptId = ctx.params.receiptId;

    if (type.length === 0) {
        notify.showError('Product name must be non-empty string!')

    } else if (isNaN(quantity)) {
        notify.showError('Quantity must be a number!')
    } else if (isNaN(price)) {
        notify.showError('Price must be a number!')
    } else {
        entriesService.createEntry(type, quantity, price, receiptId)
            .then(()=>
            {
                notify.showInfo('Entry added!');
                ctx.redirect('#/editor');
            })
            .catch(notify.handleError)
    }
};
handlers.deleteEntry = function (ctx) {
    const entryId = ctx.params.entryId;
    entriesService.remove(entryId)
        .then(function () {
            notify.showInfo("Entry removed.");
            ctx.redirect('#/editor');
        })
        .catch(notify.handleError)
};
handlers.checkout = function (ctx) {
    //take the data from the form
let receiptId = ctx.params.receiptId;
let productsCount = ctx.params.productsCount;
let total = ctx.params.total;

    if (productsCount === 0) {
        notify.showError('Cannot checkout without any products!')
    } else {
        receiptService.checkout(receiptId, productsCount, total)
            .then(()=> {
                notify.showInfo('Receipt checked out!');
                ctx.redirect('#/editor');
            })
            .catch(notify.handleError);
    }
};