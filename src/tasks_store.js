import {Task} from "./task.js";
import {Api_call_wrapper} from "./api_call_wrapper.js"
import {PORT} from "./config.js";

const api_call = Api_call_wrapper.api_call;
const tasks_api_url = `http://localhost:${PORT}/api/tasks/`

class Tasks_store extends Task {
  static store = {tasks: [], inited: false};

  constructor() {
    super();
  }

  async init_store(){
    Tasks_store.store.tasks = await api_call(tasks_api_url, 'GET')
    Tasks_store.store.inited = true
  }

  async get_all_tasks() {
    if (!Tasks_store.store.inited) {
      console.log("Local tasks store initialization")
      await this.init_store();
    }
    return Tasks_store.store.tasks;
  }

  async get_todo_tasks() {
    let todo_tasks = [];
    const all_tasks = await this.get_all_tasks()
    all_tasks.forEach(task => {
      if (task.is_completed === false && task.is_deleted === false)
        todo_tasks.push(task)
    })
    return todo_tasks;
  }

  async get_completed_tasks() {
    let completed_tasks = [];
    const all_tasks = await this.get_all_tasks()
    all_tasks.forEach(task => {
      if (task.is_completed !== false && task.is_deleted === false)
        completed_tasks.push(task)
    })
    return completed_tasks;
  }

  async add_task(task) {
    const added_task = await api_call(tasks_api_url, 'POST', task)
    Tasks_store.store.tasks.push(added_task)
  }

  delete_task(id) {
    // todo: implement the same logic as in add_task
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
