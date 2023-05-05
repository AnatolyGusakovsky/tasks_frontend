import {client} from './index.js';

const tasks = client.db('koa').collection('tasks');


const save = async ({
                      id,
                      text,
                      is_completed,
                      is_deleted
                    }) => {
  const db_resp = await tasks.insertOne({
    id,
    text,
    is_completed,
    is_deleted
  });
  let result;
  db_resp.acknowledged ?
    result = `Task saved. InsertedId: ${db_resp.insertedId}`
    : result = `Something went wrong on task saving`;
  return result
}

const get_all_tasks_DB = async () => {
  const cursor = await tasks.find();
  return cursor.toArray();
}

const get_task_DB = async (id) => {
  return await tasks.findOne({id: id}) || 'No tasks found!';
}

const update = async ({
                        id,
                        text,
                        is_completed,
                        is_deleted
                      }) => {
  const db_resp = await tasks.replaceOne({id: id}, {
    id,
    text,
    is_completed,
    is_deleted
  });
  let result;
  db_resp.acknowledged ?
    result = `Task updated successfully`
    : result = `Something went wrong on task updating`;
  return result
}

const remove_task = async id => {
  const db_resp = await tasks.deleteOne({id: id});

  if(db_resp.deletedCount === 0)
    return 'Task with provided id not found. Deletion failed.'

  let result;
  db_resp.acknowledged ?
    result = `Task deleted successfully`
    : result = `Something went wrong on task deletion`;
  return result
}

export {save, get_all_tasks_DB, get_task_DB, update, remove_task}