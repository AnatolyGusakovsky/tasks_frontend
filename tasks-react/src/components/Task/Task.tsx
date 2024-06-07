import React, {useEffect, useState} from 'react';
import { Task } from "../../models/Task";
import { deleteTask } from "../../api/tasks";
import {button, checkbox, completedTask, deleteButton, inputText, inputTextReadonly, taskItem} from './Task.css';

type TaskProps = {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: (task: Task) => void;
}

export const TaskComponent: React.FC<TaskProps> = ({ task: initialTask, onDelete, onUpdate }) => {

  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function toggleCompletion() {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    onUpdate(updatedTask);
    setTask(updatedTask);
  }

  function handleEditClick() {
    if (task.is_completed) {
      return; // Prevent editing if task is completed
    }
    if (isEditing) {
      handleSave();  // Save changes when isEditing is true and button is clicked
    }
    setIsEditing(!isEditing);  // Toggle editing state
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask({...task, text: e.target.value});
  }

  function handleSave() {
    onUpdate(task);  // Propagate the update upward
    setIsEditing(false);
  }

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      onDelete(task.id);  // Propagate the deletion upward
    } catch (e) {
      console.error(e);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <li id={`id_${task.id}`} className={`${taskItem} ${task.is_completed ? completedTask : ''}`}>
      <input
        type="checkbox"
        checked={task.is_completed}
        className={checkbox}
        onChange={toggleCompletion}
      />
      {isEditing ? (
        <input
          type="text"
          value={task.text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          className={inputText}
          autoFocus
        />
      ) : (
        <label onDoubleClick={task.is_completed ? undefined : handleEditClick} className={inputTextReadonly}>{task.text}</label> // Double click to edit
      )}
      {!task.is_completed && (
        <button onClick={handleEditClick} className={button}>
          {isEditing ? "Save" : "Edit"}
        </button>
      )}
      <button onClick={handleDelete} className={deleteButton}>Delete</button>
    </li>
  );
};
