// implement CRUD here. use interfaces. Look at LF in uc-frontend as an example.
// Given the ease of use, and to avoid common bugs related to this binding, the arrow function syntax is used for API call methods
// This approach aligns well with React's patterns and makes components easier to manage.

import axios from 'axios';
import {Task} from "../models/Task";
import {TaskSchema} from "./schemas/task";
import axiosApiInstance from './axiosInstance'
import {z} from "zod";

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