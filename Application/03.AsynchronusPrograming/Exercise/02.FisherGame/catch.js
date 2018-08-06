function attachEvents() {
    const LOAD_BTN = $(".load");
    const ADD_BTN = $(".add");
    const USERNAME = 'niki';
    const PASSWORD = '123456';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const URL = 'https://baas.kinvey.com/appdata/kid_Hkl_4NVE7/biggestCatches';
    const POST_HEADERS = {
        "Content-Type": "application/json",
        Authorization: `Basic ${BASE_64}`
    };


    LOAD_BTN.on("click", load);
    ADD_BTN.on("click", add);

    async function load() {
        $('#catches').empty();
        let result = await $.ajax({
            method: "GET",
            url: URL,
            headers: POST_HEADERS
        });
        if (!result) {
            handleError(new Error("No result from URL!"))
        }
        appendDiv(result);
    }

    function appendDiv(result) {
        for (let obj of result) {
            let divToAppend =
                $(`<div class="catch" data-id="${obj._id}">
                    <label>Angler</label>
                    <input type="text" class="angler" value="${obj.angler}"/>
                    <label>Weight</label>
                    <input type="number" class="weight" value="${obj.weight}"/>
                    <label>Species</label>
                    <input type="text" class="species" value="${obj.species}"/>
                    <label>Location</label>
                    <input type="text" class="location" value="${obj.location}"/>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${obj.bait}"/>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${obj.captureTime}"/>
                </div>`)
                    .append($('<button>Update</button>').on("click", update))
                    .append($('<button>Delete</button>').on("click", del));
            $('#catches').append(divToAppend);
        }
    }

    function update() {
        const ID = $(this).parent().attr('data-id');
        let [angler, weight, species, location, bait, captureTime] =$(`[data-id=${ID}] > input`)
           .toArray().map(i => $(i).val());

        let currentObj = {
            angler,
            weight: Number(weight),
            species,
            location,
            bait,
            captureTime: Number(captureTime)
        };

        $.ajax({
            method: "PUT",
            url: URL + "/" + ID,
            headers: POST_HEADERS,
            data: JSON.stringify(currentObj)
        }).then(function () {
            LOAD_BTN.click();
        }).catch(errHandler)
    }

    function del() {
            const ID = $(this).parent().attr('data-id');
            $.ajax({
                method: "DELETE",
                url: URL + "/" + ID,
                headers: POST_HEADERS,
            }).then(function () {
                $(`[data-id=${ID}]`).remove();
                LOAD_BTN.click();
            }).catch(errHandler)
    }

    function add() {
        let [angler, weight, species, location, bait, captureTime] =
            $('#addForm > input').toArray().map(i => $(i).val());

        let currentObj = {
            angler,
            weight: Number(weight),
            species,
            location,
            bait,
            captureTime: Number(captureTime)
        };
        $.ajax({
            method: "POST",
            url: URL,
            headers: POST_HEADERS,
            data: JSON.stringify(currentObj)
        }).then(function () {
            $('#addForm > input').toArray().forEach(i => $(i).val(""));
            LOAD_BTN.click();
        }).catch(errHandler)
    }

    function errHandler(err) {
        window.alert(err.responseText + " " + err.statusText)
    }
}

