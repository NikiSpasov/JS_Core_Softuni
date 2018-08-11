define([], function () {
    'use strict';

    function attachEvents() {
        const BASE_URL = 'https://phonebook-nakov.firebaseio.com/phonebook';
        const TABLE = $('#phonebook');
        const PERSON = $('#person');
        const PHONE = $('#phone');

        $('#btnLoad').on('click', loadContacts);
        $('#btnCreate').on('click', createContact);

        function loadContacts() {
            $.ajax({
                method: "GET",
                url: BASE_URL + '.json'
            }).then(appendContacts).catch(handleError);
        }

        function appendContacts(contacts) {
            TABLE.empty();
            let keys = Object.keys(contacts);
            //keys.sort((a, b) => contacts[a]["person"].localeCompare(contacts[b]["person"]))
            for (const id of keys) {
                let li = $('<li>');
                li.text(`${contacts[id].person}: ${contacts[id].phone}`);
                let a = $('<button> Delete</button>');
                a.on('click', function () {
                    $.ajax({
                        method: "DELETE",
                        url: BASE_URL + "/" + id + ".json"
                    }).then(function () {
                        li.remove();
                    }).catch(handleError);
                });
                li.append(a);
                TABLE.append(li);
            }
        }

        function createContact() {
            let name = PERSON.val();
            let phone = PHONE.val();
            if (name.trim() !== '' && phone.trim() !== '') {
                $.ajax({
                    method: "POST",
                    url: BASE_URL + '.json',
                    data: JSON.stringify({ name, phone })
                }).then(function () {
                    PERSON.val("");
                    PHONE.val("");
                }).catch(handleError);
            }
            PERSON.val("");
            PHONE.val("");
        }

        function handleError(err) {
            console.log(err);
        }
    }
});
//# sourceMappingURL=phonebook.js.map