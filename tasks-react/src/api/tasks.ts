import {Task} from "../models/Task";
import {TaskSchema} from "./schemas/task";
import axiosApiInstance from './axiosInstance'
import {z} from "zod";

export async function fetchTask_api(taskID:string): Promise<Task> {
  const response = await axiosApiInstance.get(`/task/${taskID}`);
  // Validate the response data at runtime using the Zod schema
  return TaskSchema.parse(response.data);
}
export async function fetchTasks_api(): Promise<ReadonlyArray<Task>> {
  const ResponseSchema = z.array(TaskSchema).optional().default([])
  const response = await axiosApiInstance.get(`/tasks/`);
  return ResponseSchema.parse(response.data);
}

export async function updateTask_api(updatedTask: Task): Promise<Task>{
    // parsedTask will have the same values as updatedTask but is guaranteed to adhere to the types and structure defined in TaskSchema
    const parsedTask = TaskSchema.parse(updatedTask);
    const response = await axiosApiInstance.put(`/tasks/${parsedTask.id}`, parsedTask);
    return response.data;
}

export async function createTask_api(task: Task): Promise<Task>{
  const parsedTask = TaskSchema.parse(task);
  const response = await axiosApiInstance.post(`/tasks/`, parsedTask);
  return response.data;
}

export async function deleteTask_api(taskId: string): Promise<void>{
 await axiosApiInstance.delete(`/tasks/${taskId}`);
}