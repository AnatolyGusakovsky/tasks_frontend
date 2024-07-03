import {Task} from "../../models/Task";

export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const FETCH_TASKS = 'FETCH_TASKS';

export function createTask_action(task: Task) {
  return {
    type: CREATE_TASK,
    payload: task
  }
}

export function deleteTask_action(id: string) {
  return {
    type: DELETE_TASK,
    payload: id,
  }
}

export function updateTask_action(task: Task) {
  return {
    type: UPDATE_TASK,
    payload: task,
  }
}

export function fetchTasks_action() {
  return {
    type: 'FETCH_TASKS',
  }
}