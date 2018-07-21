define([], function () {
    "use strict";

    function addSticker() {
        let title = $(".title");
        let content = $(".content");
        let titleText = title.val();
        let contentText = content.val();

        if (titleText === "" || contentText === "") {
            return;
        }

        let wrapper = $("#sticker-list");

        //let liElement = $(`<li class="note-content"><a class="button">x</a><h2>${titleText}</h2><hr><p>${contentText}</p></li>`);

        let otherLi = $("<li>").addClass("note-content").append($("<a>").addClass("button").text("x").click(console.log("cliiick"))).append($("<h2>").text(`${titleText}`)).append($("<hr>")).append($("<p>").text(`${contentText}`));
        title.val("");
        content.val("");

        wrapper.append(otherLi);
        $(".note-content a").on("click", function (ev) {
            $(ev.target).parent().remove();
        });
    }
});
//# sourceMappingURL=solution.js.map