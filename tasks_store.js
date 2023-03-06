import {Task} from "./task.js";

export class Tasks_store extends Task {
  static store = [];

  constructor() {
    super();
  }

  get_all_tasks() {
    return Tasks_store.store
  }

  get_todo_tasks() {
    let todo_tasks = [];
    Tasks_store.store.forEach(task => {
      if (task.is_completed === false)
        todo_tasks.push(task)
    })
    return todo_tasks;
  }

  get_completed_tasks() {
    let completed_tasks = [];
    Tasks_store.store.forEach(task => {
      if (task.is_completed !== false)
        completed_tasks.push(task)
    })
    return completed_tasks;
  }

  add_task(task) {
    Tasks_store.store.push(task)
  }

  delete_task(id) {
    let index;
    this.get_todo_tasks().forEach((el, i) => {
      if (el.id === id)
        index = i;
    })
    Tasks_store.store.splice(index, 1)
  }
}

