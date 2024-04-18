import MockAdapter from 'axios-mock-adapter';
import {fetchTask, fetchTasks, updateTask} from './tasks';
import axiosApiInstance from './axiosInstance';
import {Task} from "../models/Task";
import exp from "constants";

describe('fetchTasks', () => {

  it('fetches single task successfully', async () => {
    const taskId = "123";
    const mock = new MockAdapter(axiosApiInstance);
    const task = { id: '1', text: "this is a text for test task", isCompleted: false, isDeleted:false };

    mock.onGet(`/task/${taskId}`).reply(200, task);
    const result = await fetchTask(taskId);
    expect(result).toEqual(task);
  });

  it('fetches all tasks successfully', async () => {
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


  it('updates task successfully', async ()=>{
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask:Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted:true };
    mock.onPut(`/tasks/${updatedTask.id}`).reply(200, updatedTask);
    const response = await updateTask(updatedTask)
    expect(response).toEqual(updatedTask)
  })

  it('fails to update task with invalid data', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const invalidTask: any = { id: '12345', text: 123, isCompleted: 'no', isDeleted: true }; // Invalid types
    mock.onPut(`/tasks/${invalidTask.id}`).reply(200, invalidTask);
    await expect(updateTask(invalidTask)).rejects.toThrow();
  });

  it('handles server errors', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask: Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted: true };
    mock.onPut(`/tasks/${updatedTask.id}`).networkError();
    await expect(updateTask(updatedTask)).rejects.toThrow();
  });

  it('handles 500 internal server error', async () => {
    const mock = new MockAdapter(axiosApiInstance);
    const updatedTask: Task = { id: '12345', text: "this is a text for test task", isCompleted: false, isDeleted: true };
    mock.onPut(`/tasks/${updatedTask.id}`).reply(500);
    await expect(updateTask(updatedTask)).rejects.toThrow();
  });

});
