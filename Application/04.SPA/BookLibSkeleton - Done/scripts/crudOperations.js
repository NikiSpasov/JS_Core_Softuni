const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_r1ImPudVm';
const APP_SECRET = '050e6084d5a4403ea6451c9943883449';
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};
const BOOKS_PER_PAGE = 10;

function loginUser() {
    let username = $('#formLogin input[name="username"]').val();
    let password = $('#formLogin input[name="passwd"]').val();
    $.ajax({
        method: "POST",
        url: `${BASE_URL}user/${APP_KEY}/login`,
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Login successful.')
    }).catch(handleAjaxError)
}

function registerUser() {
    let username = $('#formRegister input[name="username"]').val();
    let password = $('#formRegister input[name="passwd"]').val();
    $.ajax({
        method: "POST",
        url: `${BASE_URL}user/${APP_KEY}/`,
        headers: AUTH_HEADERS,
        data: {
            username,
            password
        }
    }).then(function (res) {
        signInUser(res, "Registration successful.")
    })
        .catch(handleAjaxError)
}

function listBooks() {
    $.ajax({
        method: "GET",
        url: `${BASE_URL}appdata/${APP_KEY}/books`,
        headers: {
            "Authorization": `Kinvey ${sessionStorage.getItem("authToken")}`
        }
    }).then(function (result) {
       displayPaginationAndBooks(result.reverse());
    })
        .catch(handleAjaxError)
}

function createBook() {
    let title = $('#formCreateBook input[name="title"]').val();
    let author = $('#formCreateBook input[name="author"]').val();
    let description = $('#formCreateBook textarea[name="description"]').val();
    $.ajax({
        method: "POST",
        url: `${BASE_URL}appdata/${APP_KEY}/books`,
        headers: {
            "Authorization": `Kinvey ${sessionStorage.getItem("authToken")}`
        },
        data: {
          title, author, description
        }
    }).then(function (res) {
        listBooks();
        showInfo("Book created.")
    })
        .catch(handleAjaxError)
}

function deleteBook(book) {
    $.ajax({
       method: "DELETE",
       url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id,
       headers: {
           "Authorization": `Kinvey ${sessionStorage.getItem("authToken")}`,
       }
    }).then(function () {
        listBooks();
        showInfo('Book deleted.')
    }).catch(handleAjaxError);
}

function loadBookForEdit(book) {
    showView('viewEditBook');
    $('#formEditBook input[name="title"]').val(book.title);
    $('#formEditBook input[name="author"]').val(book.author);
    $('#formEditBook textarea[name="description"]').text(book.description);
    $('#formEditBook input[name="id"]').val(book._id);
}

function editBook() {
    let title = $('#formEditBook input[name="title"]').val();
    let author = $('#formEditBook input[name="author"]').val();
    let description = $('#formEditBook textarea[name="description"]').val();
    let id = $('#formEditBook input[name="id"]').val();

    $.ajax({
        method: 'PUT',
        url: BASE_URL + 'appdata/' + APP_KEY + "/books/" + id,
        headers: {
            "Authorization": `Kinvey ${sessionStorage.getItem("authToken")}`
        },
        data: {
            title,
            author,
            description
        }
    }).then(function (res) {
        listBooks();
        showInfo("Book edited.");
        console.log(res);
    }).catch(handleAjaxError);
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
}

function logoutUser() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: {"Authorization": `Kinvey ${sessionStorage.getItem("authToken")}`}
    }).then(function (res) {
        console.log("OK");
    }).catch(handleAjaxError);
   sessionStorage.clear();
   showHomeView();
   showHideMenuLinks();
   $('#loggedInUser').text(``);
    showInfo("Logout successful.");
}

function signInUser(res, message) {
    saveAuthInSession(res);
    showHideMenuLinks();
    showHomeView();
    $('#loggedInUser').text(`Hello ${res.username}!`);
    showInfo(message);
}

function displayPaginationAndBooks(books) {
    showView('viewBooks');
    let pagination = $('#pagination-demo');
    if (pagination.data("twbs-pagination")) {
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            $('#books > table tr').each((index, element)=> {
                if (index > 0) {
                    $(element).remove();
                }
            });
            let startBook = (page - 1) * BOOKS_PER_PAGE;
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length);
            $(`a:contains(${page})`).addClass('active');
            for (let i = startBook + 1; i < endBook; i++) {
                let currentElement = $(`<tr>
								<td>${books[i].title}</td>
								<td>${books[i].author}</td>
								<td>${books[i].description}</td></tr>`);
                if (books[i]._acl.creator === sessionStorage.getItem("userId")) {
                    let delB = $('<a href="#">[Delete]</a>').on("click", function () {
                        deleteBook(books[i]);
                    });
                    let editB = $('<a href="#">[Edit]</a>').on("click", function () {
                        loadBookForEdit(books[i])
                    });
                    $(currentElement).append($('<td>').append(delB).append(editB));
                }
                $("#books > table > tbody").append(currentElement);
            }
        }
    })
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg)
}