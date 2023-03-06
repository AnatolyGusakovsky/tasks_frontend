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
    // for testing only - filling store with test data
    // for (let i = 0; i < 5; i++) {
    //   let is_completed = i % 2 === 0;
    //   Tasks_store.store.push({
    //     id: i,
    //     text: `text of ${i} task`,
    //     is_completed: is_completed
    //   })
    // }
    // ----
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

  delete_task(id){
    //todo: add deletion logic, ingest it to the DOM deletion logic in main.js
  }
}

