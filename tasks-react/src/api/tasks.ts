// implement CRUD here. use interfaces. Look at LF in uc-frontend as an example.
// Given the ease of use, and to avoid common bugs related to this binding, the arrow function syntax is used for API call methods
// This approach aligns well with React's patterns and makes components easier to manage.

import axios from 'axios';
import {Task} from "../models/Task";
import {TaskSchema} from "./schemas/task";
import axiosApiInstance from './axiosInstance'
import {z} from "zod";
import {api_url} from "../../../src/config";

// uses the TaskSchema for runtime validation
export async function fetchTask(taskID:string): Promise<Task> {
  const response = await axiosApiInstance.get(`/task/${taskID}`);
  // Validate the response data at runtime using the Zod schema
  return TaskSchema.parse(response.data); // task is now validated against the Task schema and is of type Task
}
export async function fetchTasks(): Promise<ReadonlyArray<Task>> {
  const ResponseSchema = z.array(TaskSchema).optional().default([])
  const response = await axiosApiInstance.get(`/tasks/`);
  return ResponseSchema.parse(response.data);
}
//todo: ensure backend return updated entity (not a string "success" or so!)
export async function updateTask(updatedTask: Task): Promise<Task>{
    // This new object will have the same values as updatedTask but is guaranteed to adhere to the types and structure defined in TaskSchema
    const parsedTask = TaskSchema.parse(updatedTask);
    const response = await axiosApiInstance.put(`/tasks/${parsedTask.id}`, parsedTask);
    return response.data;
}

export function createTask(){}

export function deleteTask(){}