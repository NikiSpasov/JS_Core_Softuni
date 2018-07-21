define([], function () {
    "use strict";

    function attachEvents() {
        const DBURL = "https://messenger198011.firebaseio.com/-LHrTpN65T7plreELRQs/";
        const ADDITON = ".json";
        const SENDBTN = $("#submit");
        const REFRESHBTN = $("#refresh");
        const WRAPPER = $("#messages");
        const NAME = $("#author");
        const MESSAGE = $("#content");

        REFRESHBTN.on("click", function () {
            $.ajax({
                method: "GET",
                url: DBURL + ADDITON
            }).then(function (messages) {
                WRAPPER.empty();
                let keys = Object.keys(messages);
                keys.sort((a, b) => messages[a].timestamp - messages[b].timestamp);
                for (let message of keys) {
                    let result = `${messages[message].author}: ${messages[message].content} \n`;
                    WRAPPER.append(result);
                }
            }).catch(errHandler);
        });

        SENDBTN.on("click", function () {
            $.ajax({
                method: "POST",
                url: DBURL + ADDITON,
                data: JSON.stringify({
                    author: NAME.val(),
                    content: MESSAGE.val(),
                    timestamp: Date.now()
                })
            }).then(function (messages) {
                NAME.val("");
                MESSAGE.val("");
            }).catch(errHandler);
        });

        function errHandler(err) {
            window.alert("Error");
        }
    }
});
//# sourceMappingURL=solution.js.map