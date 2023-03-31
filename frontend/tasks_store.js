import {Task} from "./task.js";

class Tasks_store extends Task {
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
    let success = false
    this.get_all_tasks().forEach((task, i) => {
      if (task.id === id){
        Tasks_store.store.splice(i, 1)
        success = true;
      }
    })
    if(!success)
      return 'Error while deleting task. Task with provided id wasn\'t found in the task store'
    return `Task with id ${id} successfully deleted`
  }

  get_task(id) {
    if (this.get_all_tasks().length > 0){
    for (let i = 0; i < this.get_all_tasks().length; i++) {
      if (this.get_all_tasks()[i].id === id)
        return this.get_all_tasks()[i]
    }
  }
    else {
      throw new Error('Error in get_task function! tasks store is empty')
    }
  }
}

module.exports = Tasks_store
