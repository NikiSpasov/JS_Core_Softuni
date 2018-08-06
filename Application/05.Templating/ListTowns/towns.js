function attachEvents () {
    const container = $('#root');
    const townsInputField = $('#towns');
    $('#btnLoadTowns').on('click', function () {
        let townsInput = townsInputField.val().split(', ');
        let townsArr = townsInput.map(function (t) {
            return {townName: t}
        });
        let finalTownsArr = {towns: townsArr};
        let innerHtml = $('#towns-template').html();
        let template = Handlebars.compile(innerHtml);
        let result = template(finalTownsArr);
        container.empty();
        container.append(result);
        townsInputField.val("");
    })
}