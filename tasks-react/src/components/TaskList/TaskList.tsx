import React, {useState, useContext} from 'react';
import { TaskComponent } from '../Task/Task';
import { taskList } from './TaskList.css';
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
    const newTask = { text: newTaskText, is_completed: false, is_deleted: false, id: generateTaskId() };
    await createTask(newTask);
    setNewTaskText('');
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
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </ul>
    </div>
  );
};