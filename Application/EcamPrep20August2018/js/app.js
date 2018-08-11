$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/login', function() {
            this.partial('../templates/welcome.hbs');
        });

        this.post('#/login', function(context) {
            kinveyController.loginUser(
                context.params.username,
                context.params.password);
            this.redirect('#/profile');
        });

        this.get('#/register', function() {
            this.partial('./templates/register.hbs');
        });

        this.post('#/register', function(context) {
            kinveyController.registerUser(
                context.params.username,
                context.params.password,
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email)
            this.redirect('#/profile');
        });

        this.get('#/contacts/:userId', function(ctx) {
            this.contacts = contacts;
            this.currentContact = contacts[ctx.params.userId]
            this.loadPartials({
                details: './templates/partials/details.hbs',
            }).then(function(context) {
                this.partial('./templates/contacts.hbs');
            });
        });

        this.get('#/profile', function() {
            this.firstName = sessionStorage.getItem("firstName")
            this.lastName = sessionStorage.getItem("lastName")
            this.phone = sessionStorage.getItem("phone")
            this.email = sessionStorage.getItem("email")
            this.partial('./templates/profile.hbs');
        });

        this.put('#/profile', function(context) {
            kinveyController.editUser(
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email)
        });
    });
    app.run()
});