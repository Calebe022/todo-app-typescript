"use strict";
const STORAGE_KEY = "tasks";
const tasks = [];
// LocalStorage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        const parsedTasks = JSON.parse(data);
        tasks.push(...parsedTasks);
    }
}
// DOM
const input = document.getElementById("task-input");
const button = document.getElementById("add-task");
const list = document.getElementById("task-list");
// Render
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        const span = document.createElement("span");
        span.textContent = task.title;
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "↩" : "✔";
        completeButton.className = "complete-btn";
        completeButton.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.className = "remove-btn";
        removeButton.addEventListener("click", () => {
            const confirmDelete = confirm(`Tem certeza que deseja excluir a tarefa:\n"${task.title}"?`);
            if (confirmDelete) {
                removeTask(task.id);
            }
        });
        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(removeButton);
        list.appendChild(li);
    });
}
// Actions
function removeTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    const title = input.value.trim();
    if (title === "") {
        alert("Digite uma tarefa");
        return;
    }
    const newTask = {
        id: Date.now(),
        title,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    input.value = "";
    renderTasks();
});
// Init 
loadTasks();
renderTasks();
