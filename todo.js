var tasks = [];

document.addEventListener("DOMContentLoaded", function () {
    setupTodoList();
});

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
