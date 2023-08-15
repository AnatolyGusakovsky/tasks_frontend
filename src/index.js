import './styles.css'
import {Local_tasks_store} from "./local_tasks_store.js";
import {Render} from "./render.js";
import {Task} from "./task.js";
import {Event_emitter} from "./event_emitter.js";
import {Api_call_wrapper} from "./api_call_wrapper.js";
import {api_url} from "./config.js";

const tasks_store = new Local_tasks_store();
const event_emitter = new Event_emitter()
const api_call = Api_call_wrapper.api_call;
let incomplete_tasks_holder, completed_tasks_holder
let tasks_container = document.getElementById("tasks_container");
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
  const id = generate_id()
  const add_task_field = document.getElementById("add_task_field")
  const task_text = add_task_field.value.trim()
  if (task_text.length > 0) {
    await tasks_store.add_task(new Task(
      {
        id,
        text: task_text,
        is_completed: false,
        is_deleted: false
      }
    ))
  }
  add_task_field.value = "";
  render.delete_all_todo_tasks_from_the_DOM()
  await render.render_todo_tasks()
}

export async function editTask(listItem) {
  const id = listItem.attributes.id.value
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector("[class=edit]");
  const editMode = listItem.classList.contains("editMode");
  if (editMode) {
    editButton.innerText = 'Edit'
    label.innerText = editInput.value;

    const original_task = await tasks_store.get_task(id);
    const task_copy = new Task({...original_task});
    task_copy.edit_text(editInput.value)
    const resp = await api_call(api_url + id, 'PUT', task_copy)
    resp.ok ? original_task.edit_text(editInput.value) : console.log('error while editing text of task ' + id)
  } else {
    editButton.innerText = 'Save'
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

export async function deleteTask(listItem) {
  const id = listItem.attributes.id.value
  await tasks_store.delete_task(id)
  await render.rerender_all_tasks_in_DOM()
}

export async function mark_task_completed(listItem) {
  const id = listItem.attributes.id.value
  const original_task = await tasks_store.get_task(id);
  const task_copy = new Task({...original_task});
  task_copy.complete()
  const resp = await api_call(api_url + id, 'PUT', task_copy)
  resp.ok ? original_task.complete() : console.log('error while completing task')
  await render.rerender_all_tasks_in_DOM()
}

export async function mark_task_incomplete(listItem) {
  const id = listItem.attributes.id.value
  const original_task = await tasks_store.get_task(id);
  const task_copy = new Task({...original_task});
  task_copy.incomplete();
  const resp = await api_call(api_url + id, 'PUT', task_copy)
  resp.ok ? original_task.incomplete() : console.log('error while incompleting task')
  await render.rerender_all_tasks_in_DOM()
}

// Event emitter subscriptions
event_emitter.on('add_button_click', async () => {
  await addTask()
})

function generate_id(length = 6) {
  return 'id_' + Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}