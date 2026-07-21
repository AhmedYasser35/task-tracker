const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const STORAGE_KEY = "taskTrackerTasks";

let tasks = [];

function loadTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    tasks = Array.isArray(storedTasks) ? storedTasks : [];
  } catch (error) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const newItem = document.createElement("li");
    newItem.className = "task-item";

    const row = document.createElement("div");
    row.className = "task-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;

    if (task.completed) {
      taskTextElement.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      taskTextElement.classList.toggle("completed", checkbox.checked);
      saveTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    row.appendChild(checkbox);
    row.appendChild(taskTextElement);
    newItem.appendChild(row);
    newItem.appendChild(deleteButton);
    taskList.appendChild(newItem);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
}

loadTasks();
renderTasks();

addButton.addEventListener("click", function () {
  addTask();
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
