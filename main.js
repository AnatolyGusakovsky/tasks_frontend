let tasks_arr = [];
let tasks_container = document.getElementById("tasks");

(function init(){
  let addTaskField = document.createElement("input");
  let addButton = document.createElement("button");
  let incompleteTaskHolder = document.createElement("ul");
  let completedTasksHolder = document.createElement("ul");

  addTaskField.placeholder = "add_task_field";
  addButton.innerText = 'ADD'
  addButton.className = "add"
  incompleteTaskHolder.className = 'incompleteTaskHolder'
  completedTasksHolder.className = 'completedTasksHolder'
  incompleteTaskHolder.title = 'Incomplete Tasks'
  completedTasksHolder.title = 'Completed Tasks'

  tasks_container.appendChild(addTaskField)
  tasks_container.appendChild(addButton)
  tasks_container.appendChild(incompleteTaskHolder)
  tasks_container.appendChild(completedTasksHolder)
})();

let addTask = function () {
  let task_text = document.getElementById("add_task_field").value
  let listItem = document.createElement("li");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let checkBox = document.createElement("input");

  label.innerText = task_text;
  editInput.type = "text";
  checkBox.type = "checkbox";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
  addTaskField.value = "";
  // return listItem;
}

let editTask = function () {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector('input[type=text]');
  let label = listItem.querySelector("label");
  let editMode = listItem.classList.contains("editMode");
  if (editMode) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
}

addButton.addEventListener("click", addTask);

let deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");
  let checkBox = taskListItem.querySelector("input[type=checkbox]");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}


let markTaskCompleted = function () {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

let markTaskIncomplete = function () {
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], markTaskIncomplete);
}

