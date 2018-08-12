function showView (viewItemId) {
    $('main > section').hide();
    $(`#${viewItemId}`).show();
}

function showHideMenuLinks() {
    $('#linkHome').show();
    if (sessionStorage.getItem('username') === null) {
        $('#loggedInUser').val("");
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
        $('#linkLogout').hide();
        $('#loggedInUser').text("");
        $('#loggedInUser').hide();

    } else {
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#loggedInUser').text(`Hello, ${sessionStorage.getItem('username')}`);
        $('#loggedInUser').show();
    }
}