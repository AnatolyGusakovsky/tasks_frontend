import {deleteTask, editTaskText, mark_task_completed, mark_task_incomplete} from "./index.js";
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

    this.event_emitter.on('edit_task_btn_clicked', async (listItem) => {
      console.log('before calling edit task func')
      await editTaskText(listItem)
    })

    this.event_emitter.on('delete_task_btn_clicked', async (listItem) => {
      await deleteTask(listItem)
    })
    this.event_emitter.on('checkbox_checked', async (listItem) => {
      await mark_task_completed(listItem)
    })
    this.event_emitter.on('checkbox_unchecked', async (listItem) => {
      await mark_task_incomplete(listItem)
    })
  }

  async rerender_all_tasks_in_DOM() {
    this.delete_all_todo_tasks_from_the_DOM()
    this.delete_all_completed_tasks_from_the_DOM()
    this.render_todo_tasks()
    this.render_completed_tasks()
  }

  async render_todo_tasks() {
    const todo_tasks = await this.tasks_store.get_todo_tasks()
    todo_tasks.forEach(task => {
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

      editButton.addEventListener("click", async (event) => {
        const listItem = event.target.closest('li');
        this.event_emitter.emit('edit_task_btn_clicked', listItem)
      });
      deleteButton.addEventListener("click", async (event) => {
        const listItem = event.target.closest('li');
        this.event_emitter.emit('delete_task_btn_clicked', listItem)
      });
      checkBox.addEventListener("change", async (event) => {
        const listItem = event.target.closest('li');
        this.event_emitter.emit('checkbox_checked', listItem)
      });
      this.incomplete_tasks_holder.appendChild(listItem);
    })
  }

  async render_completed_tasks() {
    const completed_tasks = await this.tasks_store.get_completed_tasks()
    completed_tasks.forEach(task => {
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
      deleteButton.addEventListener("click", async (event) => {
        const listItem = event.target.closest('li');
        this.event_emitter.emit('delete_task_btn_clicked', listItem)
      });
      checkBox.addEventListener("change", async (event) => {
        const listItem = event.target.closest('li');
        this.event_emitter.emit('checkbox_unchecked', listItem)
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