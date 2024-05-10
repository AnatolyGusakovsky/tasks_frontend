import React, { useState, useEffect } from 'react';
import { TaskComponent } from '../Task/Task';
import { Task } from "../../models/Task";
import { fetchTasks } from "../../api/tasks";
import { taskList } from './TaskList.css';

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ReadonlyArray<Task>>([]);

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

  const handleTaskDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    setTasks(newTasks);
  };

  return (
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
  );
};
