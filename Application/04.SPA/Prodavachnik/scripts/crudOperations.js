let requester = (() => {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = "kid_SJH0l93EQ";
    const APP_SECRET = "af8a154e637d4591b277bc879803f6e5";

    function makeAuth(type) {
        if (type === "basic") {
            return 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET);
        } else {
            return 'Kinvey ' + sessionStorage.getItem('authtoken');
        }
    }

    function makeRequest(method, module, url, auth) {
        return {
            url: BASE_URL + module + '/' + APP_KEY + '/' + url,
            method,
            headers: {
                'Authorization': makeAuth(auth)
            }
        };
    }

    function get(module, url, auth) {
        return $.ajax(makeRequest('GET', module, url, auth));
    }

    //So, for the POST request if you have Content-type in headers,
    // you have to stringify JSON data, and if you don't have this in headers, don't
    //stringify data!

    function post(module, url, data, auth) {
        let req = makeRequest('POST', module, url, auth);
        req.data = data;
        return $.ajax(req)
    }

    function update(module, url, data, auth) {
        let req = makeRequest('PUT', module, url, auth);
        req.data = data;
        return $.ajax(req)
    }

    function remove(module, url, auth) {
        return $.ajax(makeRequest('DELETE', module, url, auth));
    }

    return {get, post, update, remove}

})();

//handshake test:
//requester.get('appdata', '', 'basic');

//login test
//requester.post('user', 'login', {username: 'pesho', password: 'p'}, 'basic');

function saveSession(data) {
    sessionStorage.setItem("authtoken", data._kmd.authtoken);
    sessionStorage.setItem("id", data._id);
    sessionStorage.setItem("username", data.username);
}

async function loginUser(user, pass) {
    let username;
    let password;
    if (user && pass) {
        username = user;
        password = pass;
    } else {
        username = $('#formLogin input[name="username"]').val();
        password = $('#formLogin input[name="passwd"]').val();
    }

    try {
        let response = await requester.post('user', 'login', {username, password}, 'basic');
        saveSession(response);
        showHideMenuLinks();
        $('#linkListAds').click();
        showMessage('Login successful.')
    }
    catch (e) {
        handleAjaxError(e);
    }
}

async function logoutUser() {
    try {
        let response = await requester.post('user', '_logout');
        sessionStorage.clear();
        showView('viewHome');
        showMessage('Logout successful.')
    }
    catch (e) {
        handleAjaxError(e);
    }
    showHideMenuLinks();
}

async function registerUser() {
    let username = $('#formRegister input[name="username"]').val();
    let password = $('#formRegister input[name="passwd"]').val();
    try {
        let response = await requester.post('user', "", {username, password}, 'basic');
        showMessage("Registration successful")
        await loginUser(username, password);

    } catch (e) {
        handleAjaxError(e);
    }
}

async function createAdd() {
    let form = $('#formCreateAd');
    let title = form.find('input[name="title"]').val();
    let description = form.find('input[name="description"]').val();
    let datePublished = form.find('input[name="datePublished"]').val();
    let price = form.find('input[name="price"]').val();
    let authtoken = sessionStorage.getItem('authtoken');
    let author = sessionStorage.getItem('username');

    let data = {
        authtoken, title, description, datePublished, price, author
    };

    try {
        let result = await requester.post('appdata', 'advertisements', data);
    } catch (e) {
        handleAjaxError(e)
    }

    showMessage('Advertisement was added successfully');
    form.find('input[name="title"').val("");
    form.find('input[name="datePublished"]').val("");
    form.find('input[name="price"]').val("");
    form.find('input[name="description"]').val("");
}

async function listAdvertisements() {
    await clearTable();
    let allAdvertisements = await requester.get('appdata', 'advertisements');
    for (let adv of allAdvertisements) {
        let trToAdd = $(`<tr id="${adv._id}">
            <td>${adv.title}</td>
            <td>${adv.author}</td> 
            <td>${adv.description}</td>
            <td>${adv.price}</td>
            <td>${adv.datePublished}</td>
            </tr>`);

        if (sessionStorage.getItem('username') === adv.author) {
            let deleteBtn = $('<a href="#">[Delete]</a>').on("click",
                async function (e) {
                try {
                    let result = await requester.remove('appdata', `advertisements/${adv._id}`);
                    $(e.target).parent().parent().remove();
                }catch (e) {
                    handleAjaxError(e)
                }
                });

            let editButton = $('<a href="#">[Edit]</a>').on("click",
                 function () {
                    showView('viewEditAd');
                    $('#buttonEditAd').on('click', async function () {
                        let form = $('#formEditAd');
                        let title = form.find('input[name="title"]').val();
                        let description = form.find('input[name="descritption"]').val();;
                        let datePublished = form.find('input[name="datePublished"]').val();
                        let price = form.find('input[name="price"]').val();
                        let authtoken = sessionStorage.getItem('authtoken');
                        let author = sessionStorage.getItem('username');
                        let data = {
                            authtoken, title, description, datePublished, price, author
                        };
                        try {
                            let result = await requester.update('appdata', `advertisements/${adv._id}`, data);
                        }catch (e) {
                            handleAjaxError(e);
                        }
                    })
                });

            trToAdd.append($('<td>')
                .append(deleteBtn)
                .append(editButton))
        } else {
            trToAdd.append($('<td>'));
        }
        $('#viewAds table').append(trToAdd);
    }
}

function clearTable () {
    $('#ads').find($('tbody tr')).remove();
}

function showMessage(message) {
    $('main #infoBox').text(`${message}`).show();
    $('main #infoBox').fadeOut(2800);
}

$(document).on({
    ajaxStart: function () {
        $("#loadingBox").show()
    },
    ajaxStop: function () {
        $("#loadingBox").hide()
    }
});

function handleAjaxError(error) {
    $('errorBox').val(error.statusText);
    $('errorBox').show();
}