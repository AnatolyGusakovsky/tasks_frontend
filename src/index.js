import './styles.css'

import {Tasks_store} from "./tasks_store.js";
import {Render} from "./render.js";
import {Task} from "./task.js";
import {Event_emitter} from "./event_emitter.js";

let incomplete_tasks_holder, completed_tasks_holder
let tasks_container = document.getElementById("tasks_container");
const tasks_store = new Tasks_store();
const event_emitter = new Event_emitter()
let render;

// todo: prevent saving empty task on editing
(async function init() {
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

  addButton.addEventListener("click", /*todo: why async there is needed?*/async () => {
    event_emitter.emit('add_button_click')
  });
  render = new Render(incomplete_tasks_holder, completed_tasks_holder, tasks_store);
  await render.rerender_all_tasks_in_DOM()
})();

async function addTask() {
  //todo: 1. send to backend, check here what it gets and only if responce is success, add it to local store and render.
  const id = generate_id()
  const add_task_field = document.getElementById("add_task_field")
  const task_text = add_task_field.value.trim()
  if (task_text.length > 0) {
    await tasks_store.add_task(new Task(
      id,
      task_text,
      false,
      false
    ))
  }
  add_task_field.value = "";
  render.delete_all_todo_tasks_from_the_DOM()
  await render.render_todo_tasks()
}

export function editTask(listItem) {
  const id = listItem.attributes.id.value
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector("[class=edit]");
  const editMode = listItem.classList.contains("editMode");
  if (editMode) {
    editButton.innerText = 'Edit'
    label.innerText = editInput.value;
    tasks_store.get_task(id)
    // tasks_store.get_task(id).edit_text(label.innerText)
    // 1 get task from db 2 edit text 3 send task back (update) 4 rerender all tasks
  } else {
    editButton.innerText = 'Save'
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

export async function deleteTask(listItem) {
  const id = listItem.attributes.id.value
  tasks_store.delete_task(id)
  await render.rerender_all_tasks_in_DOM()
}

function generate_id(length = 6) {
  return 'id_' + Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

export async function mark_task_completed(listItem) {
  const id = listItem.attributes.id.value
  const todo_tasks =  tasks_store.get_todo_tasks() // todo: here I need to convert json obj to task obj to perform completion
  todo_tasks.forEach(task => {
    if (task.id === id)
      task.complete();
  })
  await render.rerender_all_tasks_in_DOM()
}

export async function mark_task_incomplete(listItem) {
  const id = listItem.attributes.id.value
  const completed_tasks =  tasks_store.get_completed_tasks()
  completed_tasks.forEach(task => {
    if (task.id === id)
      task.incomplete();
  })
  await render.rerender_all_tasks_in_DOM()
}

// Event emitter subscriptions
event_emitter.on('add_button_click', async () => {
  addTask()
})