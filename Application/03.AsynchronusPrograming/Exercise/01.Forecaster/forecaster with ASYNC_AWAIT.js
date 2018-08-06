function attachEvents() {
    const URL = "https://judgetests.firebaseio.com";
    const GET_WEATHER_BTN = $('#submit');
    const LOCATION = $('#location');
    const FORECAST_DIV = $('#forecast');
    const CURRENT_CONDITIONS = $('#current');
    const UPCOMING_CONDITIONS = $('#upcoming');
    const DEGREES_SIGN = getConditionPic("Degrees");
    GET_WEATHER_BTN.click(loadForecast);

    function request(endPoint) {
        return $.ajax({
            method: "GET",
            url: URL + endPoint
        })
    }

    async function loadForecast() {
        try {
            let dataArr = await request('/locations.json'); //in that dataArr is the ARRAY with locations
            displayLocation(dataArr);
        }
        catch (err) {
            console.log(err.textContent);
        }
    }

    async function displayLocation (dataArr) {
        let searchedLocation = LOCATION.val();
        let code = dataArr.filter(f => f.name === searchedLocation)[0].code;
        if (!code) {
            errHandler(new Error("Code is not here!"))
        }
        let todayForecastPr = await request(`/forecast/today/${code}.json`);
        let threeDayForecastPr = await request(`/forecast/upcoming/${code}.json`);
        displayAllWeatherInfo([todayForecastPr, threeDayForecastPr])
      }

    function displayAllWeatherInfo([todayData, threeDayData]) {
        CURRENT_CONDITIONS.empty();
        UPCOMING_CONDITIONS.empty();
        let oldResult = todayData;
        todayData = todayData.forecast;
        const LOW_TEMP = todayData.low;
        const HIGH_TEMP = todayData.high;
        const CONDITION = todayData.condition;
        const CONDITION_PIC = getConditionPic(todayData.condition);
        let conditionSymbol = $(`<span class="condition symbol">${CONDITION_PIC}</span>`);
        let conditionSpan = $(`<span class="condition">`)
            .append($(`<span class="forecast-data">${oldResult.name}</span>`).append($("<br>")))
            .append($(`<span class="forecast-data">${LOW_TEMP + DEGREES_SIGN}/${HIGH_TEMP + DEGREES_SIGN}</span>`).append($("<br>")))
            .append($(`<span class="forecast-data">${CONDITION}</span>`));
        CURRENT_CONDITIONS
            .append(conditionSymbol)
            .append(conditionSpan);
        FORECAST_DIV.show();
        for (let weatherObj of threeDayData.forecast) {

            let span = $(`<span class="upcoming">`)
                .append($(`<span class="symbol">${getConditionPic(weatherObj.condition)}</span>`))
                .append($(`<span class="forecast-data">${weatherObj.low + DEGREES_SIGN}/${weatherObj.high + DEGREES_SIGN}</span>`))
                .append($(`<span class="forecast-data">${weatherObj.condition}</span>`));
            UPCOMING_CONDITIONS.append(span);
        }
    }

    function errHandler(err) {
        console.log(err.textContent);
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