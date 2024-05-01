import MockAdapter from 'axios-mock-adapter';
import {createTask, deleteTask, fetchTask, fetchTasks, updateTask} from './tasks';
import axiosApiInstance from './axiosInstance';
import {Task} from "../models/Task";
import exp from "constants";

describe('fetchTasks', () => {

  it('fetchTask() - fetches single task successfully', async () => {
    const taskId = "123";
    const mock = new MockAdapter(axiosApiInstance);
    const task = { id: '1', text: "this is a text for test task", isCompleted: false, isDeleted:false };

    mock.onGet(`/task/${taskId}`).reply(200, task);
    const result = await fetchTask(taskId);
    expect(result).toEqual(task);
  });

  it('fetchTasks() - fetches all tasks successfully', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const task1:Task = { id: '1', text: "this is a text for test task", isCompleted: false, isDeleted:true };
    const task2:Task = { id: '2', text: "Yhooo", isCompleted: true, isDeleted:false };
    const task3:Task = { id: '4', text: "Do not forget to have fun!", isCompleted: false, isDeleted:false };
    const tasksArr:Array<Task> = []
    tasksArr.push(task1, task2, task3)

    mock.onGet(`/tasks/`).reply(200, tasksArr);
    const response = await fetchTasks();
    expect(response).toEqual(tasksArr);
  });

  it('updateTask() - updates task successfully', async ()=>{
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask:Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted:true };
    mock.onPut(`/tasks/${updatedTask.id}`).reply(200, updatedTask);
    const response = await updateTask(updatedTask)
    expect(response).toEqual(updatedTask)
  })

  it('updateTask() - handles server errors', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask: Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted: true };
    mock.onPut(`/tasks/${updatedTask.id}`).networkError();
    await expect(updateTask(updatedTask)).rejects.toThrow();
  });

  it('updateTask() - handles 500 internal server error', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask: Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted: true };
    mock.onPut(`/tasks/${updatedTask.id}`).reply(500);
    await expect(updateTask(updatedTask)).rejects.toThrow();
  });

  it('createTask() - updates task successfully', async ()=>{
    const mock = new MockAdapter(axiosApiInstance);
    const task:Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted:true };
    mock.onPost(`/tasks/`).reply(200, task);
    const response = await createTask(task)
    expect(response).toEqual(task)
  })

  it('createTask() - handles server errors', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const task: Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted: true };
    mock.onPost(`/tasks/`).networkError();
    await expect(createTask(task)).rejects.toThrow();
  });

  it('createTask() - handles 500 internal server error', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const task: Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted: true };
    mock.onPost(`/tasks/`).reply(500);
    await expect(createTask(task)).rejects.toThrow();
  });

  it('deleteTask() - it deletes Task successfully', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const taskId: string = "32hk1234k";
    mock.onDelete(`/tasks/${taskId}`).reply(204);
    await expect(deleteTask(taskId)).resolves.toBeUndefined();
  });

});
