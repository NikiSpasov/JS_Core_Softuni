function domSearch(content, caseSensitive) {

    let container = $(content).addClass("items-control");
    container.append(
        $("<div>").addClass("add-controls")
            .append(
                $("<label>Enter text: </label>").append($("<input>")),
                $("<a class='button' style='display: inline-block'>Add</a>").on("click", function () {
                    makeElement(container.find(".add-controls input").val());
                    container.find(".add-controls input").val("");
                })),
        $("<div class='search-controls'>")
            .append(
                $("<label>Search:</label>").append($("<input>").on("keyup", function () {
                    let searchedText = container.find(".search-controls input").val();
                    showSearchedElements(searchedText, caseSensitive);
                }))),
        $("<div class='result-controls'>").append("<ul class='items-list'>")
    );

    function makeElement(text) {
        container.find(".result-controls ul")
            .append(
                $(`<li class="list-item"></li>`)
                    .append(
                        ($("<a class='button'>X</a>").click(function () {
                        (this.parentElement).remove();
                    })),
                        (`<strong>${text}</strong>`)
            ))
    }

    function showSearchedElements(text, caseSensitive) {
        let allLi = container.find(".result-controls ul li");
        let re;
        if (caseSensitive = undefined){
            caseSensitive = false;
        }
        caseSensitive ? re = new RegExp(text) : re = new RegExp(text, "gim");

        Array.from(allLi).forEach(li => {
                if ($(li).text().match(re)) {
                    $(li).css("display", "block")
                } else {
                    $(li).css("display", "none")
                }
            }
        )
    }
}