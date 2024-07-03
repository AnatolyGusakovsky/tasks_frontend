import MockAdapter from 'axios-mock-adapter';
import {createTask_api, deleteTask_api, fetchTask_api, fetchTasks_api, updateTask_api} from './tasks';
import axiosApiInstance from './axiosInstance';
import {Task} from "../models/Task";

describe('Tasks API tests', () => {

  it('fetchTask_api() - fetches single Task successfully', async () => {
    const taskId = "123";
    const mock = new MockAdapter(axiosApiInstance);
    const task = { id: '1', text: "this is a text for test Task", is_completed: false, is_deleted:false };

    mock.onGet(`/task/${taskId}`).reply(200, task);
    const result = await fetchTask_api(taskId);
    expect(result).toEqual(task);
  });

  it('fetchTasks_api() - fetches all tasks successfully', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const task1:Task = { id: '1', text: "this is a text for test Task", is_completed: false, is_deleted:true };
    const task2:Task = { id: '2', text: "Yhooo", is_completed: true, is_deleted:false };
    const task3:Task = { id: '4', text: "Do not forget to have fun!", is_completed: false, is_deleted:false };
    const tasksArr:Array<Task> = []
    tasksArr.push(task1, task2, task3)

    mock.onGet(`/tasks/`).reply(200, tasksArr);
    const response = await fetchTasks_api();
    expect(response).toEqual(tasksArr);
  });

  it('updateTask_api() - updates Task successfully', async ()=>{
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask:Task = { id: '12345', text: "this is a text for test Task", is_completed: false, is_deleted:true };
    mock.onPut(`/tasks/${updatedTask.id}`).reply(200, updatedTask);
    const response = await updateTask_api(updatedTask)
    expect(response).toEqual(updatedTask)
  })

  it('updateTask_api() - handles server errors', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask: Task = { id: '12345', text: "this is a text for test Task", is_completed: false, is_deleted: true };
    mock.onPut(`/tasks/${updatedTask.id}`).networkError();
    await expect(updateTask_api(updatedTask)).rejects.toThrow();
  });

  it('updateTask_api() - handles 500 internal server error', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask: Task = { id: '12345', text: "this is a text for test Task", is_completed: false, is_deleted: true };
    mock.onPut(`/tasks/${updatedTask.id}`).reply(500);
    await expect(updateTask_api(updatedTask)).rejects.toThrow();
  });

  it('createTask_api() - updates Task successfully', async ()=>{
    const mock = new MockAdapter(axiosApiInstance);
    const task:Task = { id: '12345', text: "this is a text for test Task", is_completed: false, is_deleted:true };
    mock.onPost(`/tasks/`).reply(200, task);
    const response = await createTask_api(task)
    expect(response).toEqual(task)
  })

  it('createTask_api() - handles server errors', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const task: Task = { id: '12345', text: "this is a text for test Task", is_completed: false, is_deleted: true };
    mock.onPost(`/tasks/`).networkError();
    await expect(createTask_api(task)).rejects.toThrow();
  });

  it('createTask_api() - handles 500 internal server error', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const task: Task = { id: '12345', text: "this is a text for test Task", is_completed: false, is_deleted: true };
    mock.onPost(`/tasks/`).reply(500);
    await expect(createTask_api(task)).rejects.toThrow();
  });

  it('deleteTask_api() - it deletes Task successfully', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const taskId: string = "32hk1234k";
    mock.onDelete(`/tasks/${taskId}`).reply(204);
    await expect(deleteTask_api(taskId)).resolves.toBeUndefined();
  });

});
