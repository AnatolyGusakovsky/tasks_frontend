import React, {useState} from 'react';
import { Task } from "../../models/Task";
import {
  button,
  buttonsContainer,
  checkbox, checkboxAndTextContainer,
  completedTask,
  deleteButton, expandedTextStyle,
  inputText,
  inputTextReadonly,
  taskItem
} from './Task.css';
import {deleteTask_actionCreator, updateTask_actionCreator} from "../../redux/actions/actionCreators";
import store from "../../redux/store";

type TaskProps = {
  task: Task;
}

export const TaskComponent: React.FC<TaskProps> = ({ task: initialTask }) => {

  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function toggleCompletion() {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    handleUpdate(updatedTask);
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
    handleUpdate(task);  // Propagate the update upward
    setIsEditing(false);
  }

  const handleDelete = () => {
   store.dispatch(deleteTask_actionCreator(task.id));
  };

  const handleUpdate = (updatedTask: Task) => {
    store.dispatch(updateTask_actionCreator(updatedTask));
    setTask(updatedTask);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleTextClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShowMoreLessClick = () => {
    setIsExpanded(!isExpanded);
  };

  const taskTextStyle = isExpanded ? expandedTextStyle : inputTextReadonly;

  const charsPerLine = 60;
  const numLines = Math.ceil(task.text.length / charsPerLine);

  return (
    <li id={`id_${task.id}`} className={`${taskItem} ${task.is_completed ? completedTask : ''}`}>
      <div className={checkboxAndTextContainer}>
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
          <div>
            <label onClick={handleTextClick} className={taskTextStyle}>{task.text}</label>
            {numLines > 3 && !isExpanded && <button onClick={handleShowMoreLessClick}>Show more</button>}
            {isExpanded && <button onClick={handleShowMoreLessClick}>Show less</button>}
          </div>
        )}
      </div>
      <div className={buttonsContainer}>
        {!task.is_completed && (
          <button onClick={handleEditClick} className={button}>
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
        <button onClick={handleDelete} className={deleteButton}>Delete</button>
      </div>
    </li>
  );
};