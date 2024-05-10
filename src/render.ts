import {deleteTask, editTaskText, mark_task_completed, mark_task_incomplete} from "./index";
import {Event_emitter} from "./event_emitter";
import { Local_tasks_store } from "./local_tasks_store";

class Render {
  incomplete_tasks_holder;
  completed_tasks_holder;
  tasks_store;
  event_emitter;

  constructor(incomplete_tasks_holder: HTMLUListElement, completed_tasks_holder: HTMLUListElement, tasks_store: Local_tasks_store) {
    this.incomplete_tasks_holder = incomplete_tasks_holder;
    this.completed_tasks_holder = completed_tasks_holder;
    this.tasks_store = tasks_store;
    this.event_emitter = new Event_emitter();

    this.event_emitter.on('edit_task_btn_clicked', async (listItem: any) => {
      console.log('before calling edit Task func')
      await editTaskText(listItem)
    })

    this.event_emitter.on('delete_task_btn_clicked', async (listItem:any) => {
      await deleteTask(listItem)
    })
    this.event_emitter.on('checkbox_checked', async (listItem:any) => {
      await mark_task_completed(listItem)
    })
    this.event_emitter.on('checkbox_unchecked', async (listItem:any) => {
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
    todo_tasks.forEach((task: any) => {
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
        // @ts-ignore
        const listItem = event.target.closest('li');
        this.event_emitter.emit('edit_task_btn_clicked', listItem)
      });
      deleteButton.addEventListener("click", async (event) => {
        // @ts-ignore
        const listItem = event.target.closest('li');
        this.event_emitter.emit('delete_task_btn_clicked', listItem)
      });
      checkBox.addEventListener("change", async (event) => {
        // @ts-ignore
        const listItem = event.target.closest('li');
        this.event_emitter.emit('checkbox_checked', listItem)
      });
      this.incomplete_tasks_holder.appendChild(listItem);
    })
  }

  async render_completed_tasks() {
    const completed_tasks = await this.tasks_store.get_completed_tasks()
    completed_tasks.forEach((task: any) => {
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
        // @ts-ignore
        const listItem = event.target.closest('li');
        this.event_emitter.emit('delete_task_btn_clicked', listItem)
      });
      checkBox.addEventListener("change", async (event) => {
        // @ts-ignore
        const listItem = event.target.closest('li');
        this.event_emitter.emit('checkbox_unchecked', listItem)
      });
    })
  }

  delete_all_todo_tasks_from_the_DOM() {
    const incompleted_tasks = document.getElementById("incomplete-tasks")
    // @ts-ignore
    while (incompleted_tasks.firstChild) {
      // @ts-ignore
      incompleted_tasks.removeChild(incompleted_tasks.firstChild)
    }
  }

  delete_all_completed_tasks_from_the_DOM() {
    const completed_tasks = document.getElementById("completed-tasks")
    // @ts-ignore
    while (completed_tasks.firstChild) {
      // @ts-ignore
      completed_tasks.removeChild(completed_tasks.firstChild)
    }
  }
}

export {Render}