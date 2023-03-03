import {Task} from "./task";

export class Tasks_store extends Task {
  static store = [];

  constructor() {
    super();
  }

   get_todo_tasks() {
    console.log('Tasks_store - get_todo_tasks()')
    Tasks_store.forEach(task => {
      console.log(task)
    })
  }

   get_completed_tasks() {
    stor
  }

   add_task(task) {
    Tasks_store.store.push(task)
  }
}

Tasks_store.get_todo_tasks()
