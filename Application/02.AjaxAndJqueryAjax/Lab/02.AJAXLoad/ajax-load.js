
$(document).ajaxError(function (ev, request, settings) {
    console.log(request.status);
    console.log(request.statusText);
});
function loadTitle() {
    $('#text').load('http://dir.bg')
}
