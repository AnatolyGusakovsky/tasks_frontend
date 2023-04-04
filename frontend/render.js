import {deleteTask, editTask, mark_task_completed, mark_task_incomplete} from "./main.js";
import {Event_emitter} from "./event_emitter.js";

class Render {
  incomplete_tasks_holder;
  completed_tasks_holder;
  tasks_store;
  event_emitter;

  constructor(incomplete_tasks_holder, completed_tasks_holder, tasks_store) {
    this.incomplete_tasks_holder = incomplete_tasks_holder;
    this.completed_tasks_holder = completed_tasks_holder;
    this.tasks_store = tasks_store;
    this.event_emitter = new Event_emitter();

    // todo: Where to store event emitter subscriptions? is it proper place?
    // event_emitter subscriptions
    this.event_emitter.subscribe('edit_task_btn_clicked', async () =>{
      console.log('before calling edit task func')
      editTask()
    })
    this.event_emitter.subscribe('delete_task_btn_clicked', async () =>{
      deleteTask()
    })
    this.event_emitter.subscribe('checkbox_checked', async () =>{
      mark_task_completed()
    })
    this.event_emitter.subscribe('checkbox_unchecked', async () =>{
      mark_task_incomplete()
    })
  }

  rerender_all_tasks_in_DOM() {
    this.delete_all_todo_tasks_from_the_DOM()
    this.render_todo_tasks()
    this.delete_all_completed_tasks_from_the_DOM()
    this.render_completed_tasks()
  }

  render_todo_tasks() {
    this.tasks_store.get_todo_tasks().forEach(task => {
      const listItem = document.createElement("li");
      const label = document.createElement("label");
      const editInput = document.createElement("input");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      const checkBox = document.createElement("input");

      label.innerText = task.text;
      listItem.id = task.id
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

      editButton.addEventListener("click", async () => {
        this.event_emitter.emit('edit_task_btn_clicked')
      });
      deleteButton.addEventListener("click", async () =>{
        this.event_emitter.emit('delete_task_btn_clicked')
      });
      checkBox.addEventListener("change", async () => {
        this.event_emitter.emit('mark_task_completed')
      });
      this.incomplete_tasks_holder.appendChild(listItem);
    })
  }

  render_completed_tasks() {
    this.tasks_store.get_completed_tasks().forEach(task => {
      const listItem = document.createElement("li");
      const label = document.createElement("label");
      const deleteButton = document.createElement("button");
      const checkBox = document.createElement("input");

      label.innerText = task.text;
      listItem.id = task.id
      checkBox.type = "checkbox";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);

      this.completed_tasks_holder.appendChild(listItem);
      deleteButton.addEventListener("click", async () =>{
        this.event_emitter.emit('delete_task_btn_clicked')
      });
      checkBox.addEventListener("change", async () => {
        this.event_emitter.emit('checkbox_unchecked')
      });
    })
  }

  delete_all_todo_tasks_from_the_DOM() {
    const incompleted_tasks = document.getElementById("incomplete-tasks")
    while (incompleted_tasks.firstChild) {
      incompleted_tasks.removeChild(incompleted_tasks.firstChild)
    }
  }

  delete_all_completed_tasks_from_the_DOM() {
    const completed_tasks = document.getElementById("completed-tasks")
    while (completed_tasks.firstChild) {
      completed_tasks.removeChild(completed_tasks.firstChild)
    }
  }
}

export {Render}