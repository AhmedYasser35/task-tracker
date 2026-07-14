const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const newItem = document.createElement("li");
  newItem.className = "task-item";

  const row = document.createElement("div");
  row.className = "task-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";

  const taskTextElement = document.createElement("span");
  taskTextElement.textContent = taskText;

  checkbox.addEventListener("change", function () {
    taskTextElement.classList.toggle("completed", checkbox.checked);
  });

  row.appendChild(checkbox);
  row.appendChild(taskTextElement);
  newItem.appendChild(row);

  taskList.appendChild(newItem);
  taskInput.value = "";
  taskInput.focus();
}

addButton.addEventListener("click", function () {
  addTask();
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
