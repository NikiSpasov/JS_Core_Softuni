function attachAllEvents(){
    $('#linkHome').on('click', function () {
        showView('viewHome');
        showHideMenuLinks();
    });

    $('#linkLogin').on('click', function () {
        showView('viewLogin');
        $('#formLogin input[name="username"]').val("");
        $('#formLogin input[name="passwd"]').val("");
    });

    $('#linkRegister').on('click', function () {
        showView('viewRegister');
        $('input[id="buttonRegisterUser"]').on("click", function () {
            registerUser();
        });
        showHideMenuLinks();
    });

    $('#linkListAds').on('click', function () {
        showView('viewAds');
        listAdvertisements();
        showHideMenuLinks();
    });

    $('#linkCreateAd').on('click', function () {
        showView('viewCreateAd');
        showHideMenuLinks();
    });

    $('#linkLogout').on('click', function () {
        showView('viewHome');
        logoutUser();
        showHideMenuLinks();
    });

    $('#buttonLoginUser').click(loginUser);

    $('#buttonCreateAd').click(createAdd)
}