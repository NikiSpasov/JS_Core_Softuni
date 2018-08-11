$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/login', function () {
            this.partial('./templates/login.hbs');
        });

        this.get('#/profile', function () {
            this.firstName = sessionStorage.getItem('firstName');
            this.lastName = sessionStorage.getItem('lastName');
            this.phone = sessionStorage.getItem('phone');
            this.email = sessionStorage.getItem('email');

            this.partial('./templates/profile.hbs');
        });

        this.get('#/register', function  () {
            this.partial('./templates/register.hbs')
        });

        this.get('#/contacts', async function () {
            this.loadPartials({
                details: './partials/details.hbs',
            }).then(async function(context) {
                let contacts = await $.get('./data.json');
                this.contacts = contacts;
                this.partial('./templates/contacts.hbs');
                console.log(context.partials);
                this.partial('pageTemplate.hbs');
            });

        });

        this.post('#/login', function (context) {
            kinveyController.loginUser(
                context.params.username,
                context.params.password);
                this.redirect('#/profile');
        });

        this.put('#/profile', function (context) {
            kinveyController.editUser(
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email);
        });

        this.post('#/register', function (context) {
            kinveyController.registerUser(
                context.params.username,
                context.params.password,
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email);
            this.redirect('#/profile');
        });
    });
    app.run();

});