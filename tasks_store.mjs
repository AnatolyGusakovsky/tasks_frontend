//todo: change .mjs extension to .js extension when imports to backend will be liquidated
import {Task} from "./task.mjs";
import {Api_call_wrapper} from "./api_call_wrapper.js"
import {PORT} from "./config.js";

const api_call = Api_call_wrapper.api_call;
const tasks_uri = `http://localhost:${PORT}/tasks/`

class Tasks_store extends Task {
  static store = [];

  constructor() {
    super();
  }

  async get_all_tasks() {
    console.log(await api_call(tasks_uri, 'GET'))
    return await api_call(tasks_uri, 'GET')
  }

  get_todo_tasks() {
    let todo_tasks = [];
    Tasks_store.store.forEach(task => {
      if (task.is_completed === false && task.is_deleted === false)
        todo_tasks.push(task)
    })
    return todo_tasks;
  }

  get_completed_tasks() {
    let completed_tasks = [];
    Tasks_store.store.forEach(task => {
      if (task.is_completed !== false && task.is_deleted === false)
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
      if (task.id === id) {
        task.delete()
        success = true;
      }
    })
    if (!success)
      return 'Error while deleting task. Task with provided id wasn\'t found in the task store'
    return `Task with id ${id} successfully marked as deleted`
  }

  get_task(id) {
    if (this.get_all_tasks().length > 0) {
      for (let i = 0; i < this.get_all_tasks().length; i++) {
        if (this.get_all_tasks()[i].id === id)
          return this.get_all_tasks()[i]
      }
    } else {
      throw new Error('Error in get_task function! tasks store is empty')
    }
  }
}

export {Tasks_store}
