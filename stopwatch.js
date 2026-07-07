var stopwatchValue = 0;
var stopwatchId = null;

document.addEventListener("DOMContentLoaded", function () {
    setupStopwatch();
});

function setupStopwatch() {
    document.getElementById("start-button").addEventListener("click", startStopwatch);
    document.getElementById("stop-button").addEventListener("click", stopStopwatch);
    document.getElementById("reset-button").addEventListener("click", resetStopwatch);
}

function startStopwatch() {
    if (stopwatchId !== null || stopwatchValue >= 30) {
        return;
    }

    stopwatchId = setInterval(function () {
        stopwatchValue += 3;
        updateStopwatchDisplay();

        if (stopwatchValue >= 30) {
            stopStopwatch();
        }
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchId);
    stopwatchId = null;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchValue = 0;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    document.getElementById("stopwatch-display").textContent = stopwatchValue;
}
