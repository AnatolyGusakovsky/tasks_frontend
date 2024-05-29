import React, { useState } from 'react';
import { Task } from "../../models/Task";
import { updateTask, deleteTask } from "../../api/tasks";
import {button, checkbox, deleteButton, inputText, inputTextReadonly, taskItem} from './Task.css';

type TaskProps = {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: (task: Task) => void;
}

export const TaskComponent: React.FC<TaskProps> = ({ task: initialTask, onDelete, onUpdate }) => {
  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function onTaskUpdate(updatedTask: Task) {
    try {
      await updateTask(updatedTask); //todo: since updateTask is also being called in TaskList, it seems redundant one. Debug and decide what to leave
      setTask(updatedTask);  // Update the local state after the API call succeeds
    } catch (e) {
      console.error(e);
    }
  }

  function toggleCompletion() {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    onTaskUpdate(updatedTask);
  }

  function handleEditClick() {
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

  return (
    <li id={`id_${task.id}`} className={taskItem}>
      <input
        type="checkbox"
        checked={task.is_completed}
        className={checkbox}
        onChange={toggleCompletion} // Toggle completion on change
      />
      {isEditing ? (
        <input
          type="text"
          value={task.text}
          onChange={handleTextChange}
          className={inputText}
          autoFocus  // Automatically focus the input on edit
        />
      ) : (
        <label onDoubleClick={handleEditClick} className={inputTextReadonly}>{task.text}</label> // Double click to edit
      )}
      <button onClick={handleEditClick} className={button}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={handleDelete} className={deleteButton}>Delete</button>
    </li>
  );
};
