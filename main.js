let tasks_arr = [];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
let addTaskField = document.getElementById("add_task_field");
let addButton = document.getElementById("submit_btn");//first button
let editBtn = document.getElementById("submit_btn");//first button

function addTask() {
  let task_text = document.getElementById("add_task_field").value

  let listItem = document.createElement("li");
  let label = document.createElement("label");//label
  let editInput = document.createElement("input");//text
  let editButton = document.createElement("button");//edit button
  let deleteButton = document.createElement("button");//delete button

  label.innerText = task_text;

  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  incompleteTaskHolder.appendChild(listItem);
  addTaskField.value = "";
  return listItem;
}

function editTask() {
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




//Set the click handler to the addTask function.
// addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
editBtn.addEventListener("click", editTask)