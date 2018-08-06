(async () => {
    const data = await $.get('./data.json');
    const contactHtml = await $.get('./templates/contact.hbs');
    let contactTemplate = Handlebars.compile(contactHtml);
    let finalData = {contacts: data};
    let resultHtml = contactTemplate(finalData);
    $('#list').append(resultHtml);

    const partialContactsHtml = await $.get('./templates/partials/personalContacts.hbs');
    const partialInfoHtml = await $.get('./templates/partials/personalInfo.hbs');

    Handlebars.registerPartial('personalContacts', partialContactsHtml);
    Handlebars.registerPartial('personalInfo', partialInfoHtml);
    const detailsHtml = await $.get('./templates/detail.hbs');
    const detailsTemplate = Handlebars.compile(detailsHtml);

    $('.contact').on('click', async function (ev) {
        let targetElement = ev.target.closest('div');
        $('.content > div').removeClass('selectedContact');
        $(targetElement).addClass('selectedContact');
        let index = $(targetElement).attr("data-id");
        const details = detailsTemplate(data[index]);
        $('#details > div').remove();
        $('#details').append(details);
    })
})();