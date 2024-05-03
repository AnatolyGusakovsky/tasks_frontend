import React, { useState } from 'react';
import { Task } from "../../models/Task";
import { updateTask, deleteTask } from "../../api/tasks";
import {button, checkbox, deleteButton, inputText, inputTextReadonly, taskItem} from './Task.css';

type TaskProps = {
  task: Task;
}

export const TaskComponent: React.FC<TaskProps> = ({ task: initialTask }) => {
  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  async function onTaskUpdate(updatedTask: Task) {
    try {
      await updateTask(updatedTask);
      setTask(updatedTask);  // Update the local state after the API call succeeds
    } catch (e) {
      console.error(e);
    }
  }

  function toggleCompletion() {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
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
    onTaskUpdate(task);
    setIsEditing(false);
  }

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      // Optional: Inform the parent component about the deletion or handle UI updates here
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <li id={`id_${task.id}`} className={taskItem}>
      <input
        type="checkbox"
        checked={task.isCompleted}
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
