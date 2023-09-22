import './styles.css'
import {Local_tasks_store} from "./local_tasks_store.js";
import {Render} from "./render.js";
import {Task} from "./task.js";
import {Event_emitter} from "./event_emitter.js";
import {Api_call_wrapper} from "./api_call_wrapper.js";
import {api_url} from "./config.js";

const local_tasks_store = new Local_tasks_store();
const event_emitter = new Event_emitter()
const api_call = Api_call_wrapper.api_call;
let incomplete_tasks_holder, completed_tasks_holder
let tasks_container = document.getElementById("tasks_container");
let render;

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

  addButton.addEventListener("click", async () => {
    event_emitter.emit('add_button_click')
  });
  render = new Render(incomplete_tasks_holder, completed_tasks_holder, local_tasks_store);
  await render.rerender_all_tasks_in_DOM()
})();

async function addTask() {
  const id = generate_id()
  const add_task_field = document.getElementById("add_task_field")
  const task_text = add_task_field.value.trim()
  if (task_text.length > 0) {
    await local_tasks_store.add_task(new Task(
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

export async function editTaskText(listItem) {
  const id = listItem.attributes.id.value
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector("[class=edit]");
  const editMode = listItem.classList.contains("editMode");
  if (editMode) {
    if (editInput.value.trim() === "") {
      alert("Task cannot be empty!");
      return; // Exit the function without toggling the edit mode or saving the task
    }
    editButton.innerText = 'Edit'
    label.innerText = editInput.value;

    const original_task = await local_tasks_store.get_task(id);
    const updated_task = new Task({...original_task});
    updated_task.edit_text(editInput.value)
    delete updated_task.id // removes id from payload, as it's passed in url
    const resp = await api_call(api_url + id, 'PUT', updated_task)
    resp.ok ? original_task.edit_text(editInput.value) : console.log('error while editing text of task ' + id)
  } else {
    editButton.innerText = 'Save'
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

export async function deleteTask(listItem) {
  const id = listItem.attributes.id.value
  await local_tasks_store.delete_task(id)
  await render.rerender_all_tasks_in_DOM()
}

export async function mark_task_completed(listItem) {
  const id = listItem.attributes.id.value
  const original_task = await local_tasks_store.get_task(id);
  const updated_task = new Task({...original_task});
  updated_task.complete()
  delete updated_task.id // removes id from payload, as it's passed in url
  const resp = await api_call(api_url + id, 'PUT', updated_task)
  resp.ok ? original_task.complete() : console.log('error while completing task')
  await render.rerender_all_tasks_in_DOM()
}

export async function mark_task_incomplete(listItem) {
  const id = listItem.attributes.id.value
  const original_task = await local_tasks_store.get_task(id);
  const updated_task = new Task({...original_task});
  updated_task.incomplete();
  delete updated_task.id // removes id from payload, as it's passed in url
  const resp = await api_call(api_url + id, 'PUT', updated_task)
  resp.ok ? original_task.incomplete() : console.log('error while incompleting task')
  await render.rerender_all_tasks_in_DOM()
}

event_emitter.on('add_button_click', async () => {
  await addTask()
})

function generate_id(length = 6) {
  return 'id_' + Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}