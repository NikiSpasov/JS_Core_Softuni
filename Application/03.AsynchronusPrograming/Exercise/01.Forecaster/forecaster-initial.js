function attachEvents() {
    const URL = "https://judgetests.firebaseio.com/locations";
    const GET_WEATHER_BTN = $('#submit');
    const LOCATION = $('#location');
    const FORECAST_DIV = $('#forecast');
    const CURRENT_CONDITIONS = $('#current');
    const UPCOMING_CONDITIONS = $('#upcoming');
    const DEGREES_SIGN = getConditionPic("Degrees");

    GET_WEATHER_BTN.click(getWeather);

    function getWeather() {
        let searchedLocation = LOCATION.val();
        $.ajax({
            method: "GET",
            url: URL + '.json' //`?query={"name":"${searchedLocation}"}\.json`
            //array from:
            //{ name: locationName,
            //   code: locationCode }
        }).then(function (result) {
            let currentForecast = result.filter(f => f.name === searchedLocation);
            const LOCATION_CODE = currentForecast[0].code;
            $.ajax({
                method: "GET",
                url: `https://judgetests.firebaseio.com/forecast/today/${LOCATION_CODE}.json`
            }).then(function (result) {
                let oldResult = result;
                result = result.forecast;
                const LOW_TEMP = result.low;
                const HIGH_TEMP = result.high;
                const CONDITION = result.condition;
                const CONDITION_PIC = getConditionPic(result.condition);

                let conditionSymbol = $(`<span class="condition symbol">${CONDITION_PIC}</span>`);
                let conditionSpan = $(`<span class="condition">`)
                    .append($(`<span class="forecast-data">${oldResult.name}</span>`).append($("<br>")))
                    .append($(`<span class="forecast-data">${LOW_TEMP + DEGREES_SIGN}/${HIGH_TEMP + DEGREES_SIGN}</span>`).append($("<br>")))
                    .append($(`<span class="forecast-data">${CONDITION}</span>`));
                CURRENT_CONDITIONS
                    .append(conditionSymbol)
                    .append(conditionSpan);
                FORECAST_DIV.show();
            }).then(function () {
                $.ajax({
                    method: "GET",
                    url: `https://judgetests.firebaseio.com/forecast/upcoming/${LOCATION_CODE}.json `
                }).then(function (result) {

                    for (let weatherObj of result.forecast) {
                        console.log(weatherObj.high);

                        let span = $(`<span class="upcoming">`)
                            .append($(`<span class="symbol">${getConditionPic(weatherObj.condition)}</span>`))
                            .append($(`<span class="forecast-data">${weatherObj.low + DEGREES_SIGN}/${weatherObj.high + DEGREES_SIGN}</span>`))
                            .append($(`<span class="forecast-data">${weatherObj.condition}</span>`));

                        UPCOMING_CONDITIONS.append(span);
                    }
                })
            }).catch(function (err) {
                FORECAST_DIV.val("Error");
            })
        }).catch(function (err) {
            FORECAST_DIV.val("Error");
        });
    }

    function getConditionPic(condition) {
        switch (condition) {
            case "Sunny":
                return "&#x2600";
            case "Partly sunny":
                return "&#x26C5";
            case "Overcast":
                return "&#x2601";
            case "Rain":
                return "&#x2614";
            case "Degrees":
                return "&#176";
        }
    }
}