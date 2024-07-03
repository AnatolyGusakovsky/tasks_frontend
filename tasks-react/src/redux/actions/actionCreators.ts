import {Task} from "../../models/Task";
import {Action, Dispatch} from "redux";
import {
  createTask_api,
  deleteTask_api,
  fetchTasks_api, updateTask_api
} from "../../api/tasks";
import { createTask_action, deleteTask_action, updateTask_action
} from "./taskActions";

export const fetchTasks_actionCreator = () => {
  return async (dispatch: Dispatch<Action>) => {
    const tasks = await fetchTasks_api();
    tasks.forEach((task: Task) => {
      dispatch(createTask_action(task));
    });
  };
};

export const createTask_actionCreator = (task: Task) => async (dispatch: Dispatch<Action>) => {
  const newTask = await createTask_api(task);
  dispatch(createTask_action(newTask));
};

export const deleteTask_actionCreator = (taskId: string) => async (dispatch: Dispatch<Action>) => {
  await deleteTask_api(taskId);
  dispatch(deleteTask_action(taskId));
};

export const updateTask_actionCreator = (task: Task) => async (dispatch: Dispatch<Action>) => {
  const updatedTask = await updateTask_api(task);
  dispatch(updateTask_action(updatedTask));
};