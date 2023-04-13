import { client } from './index.js';
const tasks = client.db('koa').collection('tasks');


const save = async ({
                      id,
                      text,
                      is_completed,
                      is_deleted
                    }) => {
  const result = await tasks.insertOne({
    id,
    text,
    is_completed,
    is_deleted
  });
  // Returns the inserted data
  return result.ops[0];
}

const get_all_tasks_DB = async () => {
  const cursor = await tasks.find();
  //Converts the result into an array
  return cursor.toArray();
}

const get_task_DB = async (id) => {
  return await tasks.findOne({id: id}); // todo: here can be an issue with id, figure out how to search by id properly
}

const update = async ({
                        id,
                        text,
                        is_completed,
                        is_deleted
                      }) => {
  const result = await tasks.replaceOne({id: id}, {
    id,
    text,
    is_completed,
    is_deleted
  }); // todo: here can be an issue with id, figure out how to search by id properly
  return result.ops[0];
}

const remove_task = async id => {
  await tasks.deleteOne({id: id});
}

export {save, get_all_tasks_DB, get_task_DB, update, remove_task}