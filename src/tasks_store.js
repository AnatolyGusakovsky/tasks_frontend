import {Task} from "./task.js";
import {Api_call_wrapper} from "./api_call_wrapper.js"
import {PORT} from "./config.js";

const api_call = Api_call_wrapper.api_call;
const tasks_api_url = `http://localhost:${PORT}/api/tasks/`

class Tasks_store {
  static store = {tasks: [], inited: false};

  async init_store() {
    const tasks_resp = await api_call(tasks_api_url, 'GET')
    const tasksData = await tasks_resp.json();
    Tasks_store.store.tasks = tasksData.map(task => new Task(task));
    Tasks_store.store.inited = true;
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
    const added_task_obj = await api_call(tasks_api_url, 'POST', task)
    const added_task = await added_task_obj.json()
    console.log('added_task')
    console.log(added_task)
    Tasks_store.store.tasks.push(new Task(added_task))
    console.log('Tasks_store.store.tasks after adding')
    console.log(Tasks_store.store.tasks)
  }

  async delete_task(id) {
    const response = await api_call(tasks_api_url + id, 'DELETE')
    if (response.ok) {
      let success = false
      const all_tasks = await this.get_all_tasks()
      all_tasks.forEach((task, i) => {
        if (task.id === id) {
          task.delete()
          success = true;
        }
      })
      if (!success)
        console.log ('Error while deleting task. Task with provided id wasn\'t found in the local task store')
      console.log ( `Task with id ${id} successfully marked as deleted in the local task store`)
    }
  }

  async get_task(id) {
    const all_tasks = await this.get_all_tasks();
    const task = all_tasks.find(t => t.id === id);
    if (task) {
      return task;
    } else {
      throw new Error(`Error in get_task function! Task with id ${id} not found.`);
    }
  }
}

export {Tasks_store}
