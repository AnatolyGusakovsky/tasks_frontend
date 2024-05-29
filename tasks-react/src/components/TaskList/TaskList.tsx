import React, { useState, useEffect } from 'react';
import { TaskComponent } from '../Task/Task';
import { Task } from "../../models/Task";
import {createTask, fetchTasks, updateTask} from "../../api/tasks";
import { taskList } from './TaskList.css';
import {generateTaskId} from "../../helpers/utils";
import {button, taskItem} from "../Task/Task.css";

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (e) {
        console.error("Failed to fetch tasks", e);
      }
    };

    loadTasks();
  }, []);

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAdd = async () => {
    const newTask = { text: newTaskText, is_completed: false, is_deleted: false, id: generateTaskId() };
    const createdTask = await createTask(newTask);
    setTasks([...tasks, createdTask]);
    setNewTaskText('');
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskUpdate = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      setTasks(newTasks);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
        <div className={taskItem}>
          <input type="text" value={newTaskText} onChange={handleNewTaskChange} />
          <button className={button} onClick={handleAdd}>Add</button>
        </div>
      <ul className={taskList}>
        {tasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onDelete={handleTaskDelete}
            onUpdate={handleTaskUpdate}
          />
        ))}
      </ul>
    </div>
  );
};
