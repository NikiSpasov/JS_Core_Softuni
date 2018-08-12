handlers.getWelcomePage = function (ctx) { //this function accepts the context
    ctx.loadPartials({    //first we define names for template, that are in the
        //template and their paths
        loginForm: './templates/forms/login-form.hbs',
        registerForm: './templates/forms/register-form.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () { //becasue it retursn promise, then we engage the main template.
        //the .partial() is tricky name, this is about the main ;)
        this.partial('./templates/welcome.hbs')
    })
};

handlers.registerUser = function (ctx) {
    //let's take the values of input fields (by name)
    const username = ctx.params.username;
    const password = ctx.params.password;
    const passwordCheck = ctx.params.passwordCheck;

    //CHECK:
    //console.log(passwordCheck);

    if (username.length < 5) {
        notify.showError('Username must be at least 5 symbols')
    } else if (password.length === 0) {
        notify.showError('Password must be non-empty')
    } else if (password !== passwordCheck) {
        notify.showError('Passwords must match')
    } else {
        auth.register(username, password)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo("User registration successful.")
                ctx.redirect('#/editor')
            })
            .catch(notify.handleError)
    }
};

handlers.loginUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;

    if (username.length === 0) {
        notify.showError('Username is required')
    } else if (password.length === 0) {
        notify.showError('Password is required')
    } else {
        auth.login(username, password)
            .then((userData) =>
            {
                auth.saveSession(userData);
                notify.showInfo("Login successful.");
                ctx.redirect('#/editor');
            })
            .catch(notify.handleError);
    }
};

handlers.logout = function (ctx) {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful.')
            ctx.redirect('#/home');
        });

};