import { CREATE_TASK, DELETE_TASK, UPDATE_TASK, FETCH_TASKS } from '../actions/taskActions';
import {Task} from "../../models/Task";

const initialState:Task [] = [];

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case UPDATE_TASK:
      return state.map((task) => (task.id === action.payload.id ? action.payload : task));
    default:
      return state;
  }
};

export default taskReducer;