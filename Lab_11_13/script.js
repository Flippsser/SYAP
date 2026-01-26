class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.completed = false;
    }

    rename(newTitle) {
        this.title = newTitle;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

class Todolist {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id != id);
    }

    filterTasks(mode) {
        if (mode == "completed") return this.tasks.filter(t => t.completed);
        if (mode == "not_completed") return this.tasks.filter(t => !t.completed);
        return this.tasks;
    }
}


let todo = new Todolist(1, "Список дел");
let currentFilter = "all";
let taskIdCounter = 0;
const list = document.getElementById("taskList");
const template = document.getElementById("task-template");

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
    const text = input.value;
    if (!text) return;

    todo.addTask(new Task(++taskIdCounter, text));
    input.value = "";
    renderTasks();
});


document.querySelectorAll(".filters .btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

function renderTasks() {
    list.innerHTML = "";

    const filteredTasks = todo.filterTasks(currentFilter);

    filteredTasks.forEach(task => {
        const taskElem = template.content.cloneNode(true);

        const checkbox = taskElem.querySelector(".task-check");
        const title = taskElem.querySelector(".task-title");
        const editBtn = taskElem.querySelector(".btn-blue");
        const deleteBtn = taskElem.querySelector(".btn-red");

        checkbox.checked = task.completed;
        title.textContent = task.title;

        if (task.completed) {
            title.classList.add("completed-task");
        }

        checkbox.addEventListener("change", () => {
            task.toggle();
            renderTasks();
        });

        editBtn.addEventListener("click", () => {
            const newTitle = prompt("Введите новое название:", task.title);
            if (newTitle) {
                task.rename(newTitle);
                renderTasks();
            }
        });

        deleteBtn.addEventListener("click", () => {
            todo.deleteTask(task.id);
            renderTasks();
        });

        list.appendChild(taskElem);
    });
}


