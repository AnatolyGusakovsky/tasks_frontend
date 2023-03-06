import {Tasks_store} from "./tasks_store.js";
import {Render} from "./render.js";
let incomplete_tasks_holder, completed_tasks_holder
let tasks_container = document.getElementById("tasks");
const tasks_store = new Tasks_store();
const render = new Render();

(function init() {
  const addTaskField = document.createElement("input");
  const addButton = document.createElement("button");
  incomplete_tasks_holder = document.createElement("ul");
  completed_tasks_holder = document.createElement("ul");
  const todo_header = document.createElement('h3')
  const completed_tasks_header = document.createElement('h3')

  todo_header.textContent = 'To Do'
  completed_tasks_header.textContent = 'Completed'
  addTaskField.id = "add_task_field";
  addButton.innerText = 'ADD'
  addButton.className = "add"
  incomplete_tasks_holder.className = 'incomplete_tasks_holder'
  incomplete_tasks_holder.title = 'Incomplete Tasks'
  incomplete_tasks_holder.id = 'incomplete-tasks'
  completed_tasks_holder.className = 'completed_tasks_holder'
  completed_tasks_holder.id = 'completed-tasks'
  completed_tasks_holder.title = 'Completed Tasks'

  tasks_container.appendChild(addTaskField)
  tasks_container.appendChild(addButton)
  tasks_container.appendChild(todo_header)
  tasks_container.appendChild(incomplete_tasks_holder)
  tasks_container.appendChild(completed_tasks_header)
  tasks_container.appendChild(completed_tasks_holder)

  addButton.addEventListener("click", addTask);
})();

function addTask() {
  const id = generate_id()
  let add_task_field = document.getElementById("add_task_field")
  let task_text = add_task_field.value.trim()
  if (task_text.length > 0) {
    tasks_store.add_task({
      id: id,
      text: task_text,
      is_completed: false
    })
  }
  add_task_field.value = "";
  render.delete_all_todo_tasks_from_the_DOM()
  render.render_todo_tasks(tasks_store.get_todo_tasks())
}

let editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector("[class=edit]");
  const editMode = listItem.classList.contains("editMode");
  if (editMode) {
    editButton.innerText = 'Edit'
    label.innerText = editInput.value;
  } else {
    editButton.innerText = 'Save'
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

let deleteTask = function () {
  let listItem = this.parentNode;
  let id = listItem.attributes.id.value
  tasks_store.delete_task(id)
  render.rerender_all_tasks_in_DOM()
}

for (let i = 0; i < incomplete_tasks_holder.children.length; i++) {
  console.log('WOW HERE 1')
  render.bind_task_events(incomplete_tasks_holder.children[i], render.mark_task_completed(incomplete_tasks_holder, completed_tasks_holder, tasks_store));
}

for (let i = 0; i < completed_tasks_holder.children.length; i++) {
  console.log('WOW HERE 2')
  render.bind_task_events(completed_tasks_holder.children[i], render.mark_task_incomplete(incomplete_tasks_holder, completed_tasks_holder, tasks_store));
}

function generate_id(length = 6) {
  return 'id_' + Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}


