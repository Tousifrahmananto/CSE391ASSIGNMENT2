var fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "A fresh idea will become useful when you act on it.",
    "Small consistent steps will create a big result.",
    "Your patience today will make tomorrow easier.",
    "A curious mind will always find another door.",
    "Good work begins when you give your full attention.",
    "The best time to learn something new is now.",
    "Clear thinking turns difficult tasks into simple steps.",
    "Kindness and discipline are both signs of strength.",
    "A confident beginning is already half of progress."
];

var fortuneThemes = {
    blue: {
        color: "#ffffff",
        backgroundColor: "#184e77",
        borderColor: "#ffd166",
        fontSize: "22px",
        fontFamily: "Arial, Helvetica, sans-serif"
    },
    green: {
        color: "#111827",
        backgroundColor: "#b7f7c1",
        borderColor: "#0f766e",
        fontSize: "23px",
        fontFamily: "Georgia, 'Times New Roman', serif"
    },
    red: {
        color: "#ffffff",
        backgroundColor: "#9d0208",
        borderColor: "#ffba08",
        fontSize: "21px",
        fontFamily: "Verdana, Geneva, sans-serif"
    },
    purple: {
        color: "#fff7ad",
        backgroundColor: "#3c096c",
        borderColor: "#9ef01a",
        fontSize: "24px",
        fontFamily: "'Trebuchet MS', Arial, sans-serif"
    }
};

var stopwatchValue = 0;
var stopwatchId = null;
var tasks = [];

document.addEventListener("DOMContentLoaded", function () {
    showRandomFortune();
    setupFortuneButtons();
    setupStopwatch();
    setupTodoList();
});

function showRandomFortune() {
    var randomIndex = Math.floor(Math.random() * fortunes.length);
    document.getElementById("fortune-text").textContent = fortunes[randomIndex];
}

function setupFortuneButtons() {
    var buttons = document.querySelectorAll(".style-button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var themeName = button.getAttribute("data-theme");
            applyFortuneTheme(themeName);
        });
    });
}

function applyFortuneTheme(themeName) {
    var theme = fortuneThemes[themeName];
    var fortuneBox = document.getElementById("fortune-box");
    var fortuneText = document.getElementById("fortune-text");

    fortuneBox.style.backgroundColor = theme.backgroundColor;
    fortuneBox.style.borderColor = theme.borderColor;
    fortuneText.style.color = theme.color;
    fortuneText.style.fontSize = theme.fontSize;
    fortuneText.style.fontFamily = theme.fontFamily;
}

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
    }, 3000);
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

function setupTodoList() {
    var savedTasks = localStorage.getItem("cse391Tasks");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }

    document.getElementById("todo-form").addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

    renderTasks();
}

function addTask() {
    var input = document.getElementById("todo-input");
    var taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(taskId) {
    tasks = tasks.map(function (task) {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("cse391Tasks", JSON.stringify(tasks));
}

function renderTasks() {
    var list = document.getElementById("todo-list");
    list.innerHTML = "";

    tasks.forEach(function (task) {
        var listItem = document.createElement("li");
        var checkbox = document.createElement("input");
        var taskText = document.createElement("span");
        var deleteButton = document.createElement("button");

        listItem.className = "todo-item";
        if (task.completed) {
            listItem.classList.add("completed");
        }

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            toggleTask(task.id);
        });

        taskText.className = "todo-text";
        taskText.textContent = task.text;

        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}
