let createBook =
    (function bookGenerator() {
        let id = 1;
        return function (selector, bookName, authorName, isbn) {
            $(selector).append(
                $(`<div id="book + ${id++}"></div>`).append(
                    $(`<p class="title">${bookName}</p>`),
                    $(`<p class="author">${authorName}</p>`),
                    $(`<p class="isbn">${isbn}</p>`),
                    $("<button>Select</button>").on("click", function () {
                        $(this).parent().css("border", "2px solid blue");
                    }),
                    $("<button>Deselect</button>").on("click", function () {
                        $(this).parent().css("border", "none")
                    })
                ));
        }
    }());