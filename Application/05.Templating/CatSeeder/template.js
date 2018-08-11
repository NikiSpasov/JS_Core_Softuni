$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        $('.btn-primary').on('click', function (ev) {
            let buttonText = $(ev.target).text();

            const parentDiv = ($(ev.target).parent().parent());
            const container = ($(ev.target).parent());
            let imgElement = $(parentDiv).find('img');

            let catId = imgElement.attr('src').split(/\D+/g).filter(p => p !== "").join("");

            let currentCat = cats.filter(c => c.id === catId).map(function (cat) {
                return {
                    id: cat.id,
                    statusCode: cat.statusCode,
                    statusMessage: cat.statusMessage
                }
            })[0];
            let innerHtml = $('#cat-template').html();
            let template = Handlebars.compile(innerHtml);
            let final = template(currentCat);
            if (buttonText === "Show status code") {
                container.append(final);
                $(ev.target).text('Hide status code')
            } else {
                $(`div #${catId}`).remove();
                $(ev.target).text('Show status code')
            }
        })
    }
});
