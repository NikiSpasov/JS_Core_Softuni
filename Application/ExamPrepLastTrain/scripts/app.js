const handlers = {};

$(() => {
    // Define routes here using Sammy.js
    const app = Sammy('#container', function  () { //in the main container
        this.use('Handlebars', 'hbs'); //configure handlebars add-on

        this.get('index.html', handlers.getWelcomePage);
        this.get('#/home', handlers.getWelcomePage);
        //by method and action in the form

        this.post('#/register', handlers.registerUser);
        this.post('#/login', handlers.loginUser);
        this.get('#/logout', handlers.logout);

        this.get('#/editor', handlers.getEditor);
        this.post('#/entry/create', handlers.createEntry);

        this.post('#/entry/delete', handlers.deleteEntry);
        this.post('#/checkout', handlers.checkout);

        this.get('#/overview', handlers.getMyReceipts);
        this.get('#/receipt/details/:id', handlers.getReceiptDetails)

    });

    app.run();
});