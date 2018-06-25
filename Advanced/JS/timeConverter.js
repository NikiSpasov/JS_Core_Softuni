function attachEventsListeners() {
    let testElements = document.querySelectorAll('[value="Convert"]');
    for (let i = 0; i < testElements.length; i++) {
        testElements[i].addEventListener("click", function (ev) {
            let currentDiv = ev.target.parentElement;
            let days = 0;
            let minutes = 0;
            let hours = 0;
            let seconds = 0;
            switch(ev.target.id) {
                case "daysBtn":
                    days = Number(document.getElementById("days").value);
                    hours = days * 24;
                    minutes = hours * 60;
                    seconds = minutes * 60;
                    document.getElementById("hours").value = hours;
                    document.getElementById("minutes").value = minutes;
                    document.getElementById("seconds").value = seconds;
                    break;
                case "hoursBtn":
                     hours = Number(document.getElementById("hours").value);
                     days = hours / 24;
                     minutes = hours * 60;
                     seconds = minutes * 60;
                    document.getElementById("days").value = days;
                    document.getElementById("minutes").value = minutes;
                    document.getElementById("seconds").value = seconds;
                    break;
                case "minutesBtn":
                    minutes = Number(document.getElementById("minutes").value);
                    hours = minutes / 60;
                    days = hours / 24;
                    seconds = minutes * 60;
                    document.getElementById("hours").value = hours;
                    document.getElementById("days").value = days;
                    document.getElementById("seconds").value = seconds;
                    break;
                case "secondsBtn":
                    seconds = Number(document.getElementById("seconds").value);
                    minutes = seconds / 60;
                    hours = minutes / 60;
                    days = hours / 24;
                    document.getElementById("hours").value = hours;
                    document.getElementById("minutes").value = minutes;
                    document.getElementById("days").value = days;
                    break;
            }
        })
    }

}