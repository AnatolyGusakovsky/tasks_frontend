import {get_all_tasks_DB, get_task_DB, save, remove_task, update} from "../dal/tasks.dao.js";

const create_task = async ({
                             id,
                             text,
                             is_completed,
                             is_deleted
                           }) => {
  const task = {
    id,
    text,
    is_completed,
    is_deleted
  }
  return await save(task);
}

const get_all_tasks = async () => {
  return await get_all_tasks_DB();
}

const get_task = async id => {
  return await get_task_DB(id);
}

const delete_task = async id => {
  return await remove_task(id);
}

const update_task = async ({
                             id,
                             text,
                             is_completed,
                             is_deleted
                           }) => {
  return await update({
    id,
    text,
    is_completed,
    is_deleted
  });
}

export {create_task, get_all_tasks, get_task, delete_task, update_task}