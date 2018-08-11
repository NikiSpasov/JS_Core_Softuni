const app = Sammy('#main', function () {
    this.use('Handlebars', 'hbs');
    this.get('#/about/:name', function () {
        this.name = this.params.name;
        this.title = "Greetings";
        this.partial('greetings.hbs');
    });
});

$(() => {
    app.run();
});
