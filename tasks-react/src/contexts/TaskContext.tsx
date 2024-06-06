import React, {useState, useEffect} from 'react';
import { Task } from '../models/Task';
import { createTask as apiCreateTask, fetchTasks as apiFetchTasks, updateTask as apiUpdateTask } from '../api/tasks';

interface TaskContextProps {
  tasks: ReadonlyArray<Task>;
  fetchTasks: () => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => Promise<void>;
}

const TaskContext = React.createContext<TaskContextProps>({
  tasks: [],
  fetchTasks: async () => {},
  createTask: async () => {},
  deleteTask: () => {},
  updateTask: async () => {},
});

export const TaskContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([]);

  const fetchTasks = async () => {
    const fetchedTasks = await apiFetchTasks();
    setTasks(fetchedTasks);
  };

  const createTask = async (task: Task) => {
    const createdTask = await apiCreateTask(task);
    setTasks(prevTasks => [...prevTasks, createdTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      await apiUpdateTask(updatedTask);
      setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;