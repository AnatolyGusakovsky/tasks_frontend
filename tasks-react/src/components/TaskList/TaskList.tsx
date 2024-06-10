import React, {useState, useContext} from 'react';
import { TaskComponent } from '../Task/Task';
import {addButton, addField, taskList} from './TaskList.css';
import {generateTaskId} from "../../helpers/utils";
import {button, taskItem} from "../Task/Task.css";
import TaskContext from '../../contexts/TaskContext';

export const TaskList: React.FC = () => {

  const { tasks, fetchTasks, createTask, deleteTask, updateTask } = useContext(TaskContext);
  const [newTaskText, setNewTaskText] = useState<string>('');

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAdd = async () => {
    if (!newTaskText) {
      return;
    }
    const newTask = { text: newTaskText, is_completed: false, is_deleted: false, id: generateTaskId() };
    await createTask(newTask);
    setNewTaskText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const todoTasks = tasks.filter(task => !task.is_completed);
  const completedTasks = tasks.filter(task => task.is_completed);

  return (
    <div>
      <div className={addField}>
        <input type="text" value={newTaskText} onChange={handleNewTaskChange} onKeyDown={handleKeyDown}/>
        <button className={addButton} onClick={handleAdd}>Add</button>
      </div>
      <ul className={taskList}>
        {todoTasks.reverse().map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </ul>
      <ul className={taskList}>
        {completedTasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </ul>
    </div>
  );
};