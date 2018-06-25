function timer() {
    let secondsSpan = $("#seconds");
    let minutesSpan = $("#minutes");
    let hoursSpan = $("#hours");
    let startBtn = $("#start-timer");
    let pauseButton = $("#stop-timer");

    let started = false;
    let seconds = 1;
    let minutes = 0;
    let hours = 0;
    let timer;

    $(startBtn).on("click", function () {
        if (!started) {
            started = true;
            timer = setInterval(step, 1000);
        }
    });
    $(pauseButton).on("click", function () {
        clearInterval(timer);
        started = false;
    });

    function step() {
        if (started) {
            if (seconds === 60) {
                seconds = 0;
                ++minutes;
            }
            if (minutes === 60) {
                minutes = 0;
                ++hours;
            }
            $(secondsSpan).text(("0" + seconds++).slice(-2));
            $(minutesSpan).text(("0" + minutes).slice(-2));
            if (hours <= 9) {
                $(hoursSpan).text("0" + hours);
            } else {
                $(hoursSpan).text(hours);
            }
        }
    }
}