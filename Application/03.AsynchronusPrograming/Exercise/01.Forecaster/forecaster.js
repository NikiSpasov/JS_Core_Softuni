function attachEvents() {
    let baseUrl = "https://judgetests.firebaseio.com/";
    $("#submit").click(loadCode);
    function loadCode() {
        $.get(baseUrl  + "locations.json")
            .then(getLocations)
            .catch(displayError)
    }
    function getLocations(locations) {
        let toSearch = $("#location").val();
        let code;
        for (let i = 0; i < locations.length; i++) {
            for (let key in locations[i]) {
                if (locations[i][key].indexOf(toSearch)!== -1)
                    code = locations[i].code;
            }
        }
        let today = $.ajax({
            method: "GET",
            url: baseUrl + "/forecast/today/" + code + ".json"
        });
        let upcoming = $.ajax({
            method: "GET",
            url: baseUrl + "/forecast/upcoming/" + code + ".json"
            });


        Promise.all([today, upcoming])
            .then(displayWeather)
            .catch(displayError)
    }
    function displayWeather([today, upcoming]) {
        $("#location").val('');
        $("#forecast").css("display", '');
        let divCurrent = $("#current");
        let conditionSymbolSpan = $("<span>").attr("class", "condition symbol").html(symbols(today.forecast.condition));
        let conditionSpan = $("<span>").attr("class", "condition");
        let nameSpan = $("<span>").attr("class", "forecast-data").text(today.name);
        let degreesSpan = $("<span>").attr("class", "forecast-data").html(`${today.forecast.low}${symbols('Degrees')}/${today.forecast.high}${symbols('Degrees')}`);
        let conditionSpanText = $("<span>").attr("class", "forecast-data").text(today.forecast.condition);
        divCurrent.append(conditionSymbolSpan);
        conditionSpan.append(nameSpan);
        conditionSpan.append(degreesSpan);
        conditionSpan.append(conditionSpanText);
        divCurrent.append(conditionSpan)
        let divUpcoming = $("#upcoming");
        let spanUpcoming = $("<span>").attr("class", "upcoming");
        conditionSpan = $("<span>").attr("class", "symbol").html(symbols(upcoming.forecast[0].condition));
        degreesSpan = $("<span>").attr("class", "forecast-data").html(`${upcoming.forecast[0].low}${symbols('Degrees')}/${upcoming.forecast[0].high}${symbols('Degrees')}`);
        conditionSpanText = $("<span>").attr("class", "forecast-data").text(upcoming.forecast[0].condition);
        spanUpcoming.append(conditionSpan);
        spanUpcoming.append(degreesSpan);
        spanUpcoming.append(conditionSpanText);
        divUpcoming.append(spanUpcoming);
        conditionSpan = $("<span>").attr("class", "symbol").html(symbols(upcoming.forecast[1].condition));
        degreesSpan = $("<span>").attr("class", "forecast-data").html(`${upcoming.forecast[1].low}${symbols('Degrees')}/${upcoming.forecast[1].high}${symbols('Degrees')}`);
        conditionSpanText = $("<span>").attr("class", "forecast-data").text(upcoming.forecast[1].condition)
        spanUpcoming = $("<span>").attr("class", "upcoming");
        spanUpcoming.append(conditionSpan);
        spanUpcoming.append(degreesSpan);
        spanUpcoming.append(conditionSpanText);
        divUpcoming.append(spanUpcoming);
        conditionSpan = $("<span>").attr("class", "symbol").html(symbols(upcoming.forecast[2].condition));
        degreesSpan = $("<span>").attr("class", "forecast-data").html(`${upcoming.forecast[2].low}${symbols('Degrees')}/${upcoming.forecast[2].high}${symbols('Degrees')}`);
        conditionSpanText = $("<span>").attr("class", "forecast-data").text(upcoming.forecast[2].condition)
        spanUpcoming = $("<span>").attr("class", "upcoming");
        spanUpcoming.append(conditionSpan);
        spanUpcoming.append(degreesSpan);
        spanUpcoming.append(conditionSpanText);
        divUpcoming.append(spanUpcoming);
    }
    function symbols(condition) {
        switch (condition) {
            case 'Sunny': return '&#x2600;';
            case 'Partly sunny': return '&#x26C5;';
            case 'Overcast': return '&#x2601;';
            case 'Rain': return '&#x2614;';
            case 'Degrees': return '&#176;';
        }
    }
    function displayError(err) {
        $("#forecast").text(err.statusText);
    }
}