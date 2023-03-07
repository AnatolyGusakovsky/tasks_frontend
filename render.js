export class Render {
  static incomplete_tasks_holder;
  static completed_tasks_holder;

  rerender_all_tasks_in_DOM(incomplete_tasks_holder, completed_tasks_holder, tasks_store) {
    this.delete_all_todo_tasks_from_the_DOM(incomplete_tasks_holder, tasks_store)
    this.render_todo_tasks()
    this.delete_all_completed_tasks_from_the_DOM(completed_tasks_holder, tasks_store)
    this.render_completed_tasks()
  }

  render_todo_tasks(incomplete_tasks_holder, tasks_store) {
    tasks_store.get_todo_tasks().forEach(task => {
      let listItem = document.createElement("li");
      let label = document.createElement("label");
      let editInput = document.createElement("input");
      let editButton = document.createElement("button");
      let deleteButton = document.createElement("button");
      let checkBox = document.createElement("input");

      label.innerText = task.text;
      listItem.id = task.id
      editInput.type = "text";
      checkBox.type = "checkbox";
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      Render.incomplete_tasks_holder.appendChild(listItem);
      this.bind_task_events(listItem, markTaskCompleted);
    })
  }

  render_completed_tasks(completed_tasks_holder, tasks_store) {
    tasks_store.get_completed_tasks().forEach(task => {
      let listItem = document.createElement("li");
      let label = document.createElement("label");
      let deleteButton = document.createElement("button");
      let checkBox = document.createElement("input");

      label.innerText = task.text;
      listItem.id = task.id
      checkBox.type = "checkbox";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);

      completed_tasks_holder.appendChild(listItem);
      this.bind_task_events(listItem, markTaskIncomplete, true);
    })
  }

  delete_all_todo_tasks_from_the_DOM() {
    const incompleted_tasks = document.getElementById("incomplete-tasks")
    while (incompleted_tasks.firstChild) {
      incompleted_tasks.removeChild(incompleted_tasks.firstChild)
    }
  }

  delete_all_completed_tasks_from_the_DOM() {
    const completed_tasks = document.getElementById("completed-tasks")
    while (completed_tasks.firstChild) {
      completed_tasks.removeChild(completed_tasks.firstChild)
    }
  }

  bind_task_events (taskListItem, checkBoxEventHandler, completed = false) {
    if (completed) {
      let deleteButton = taskListItem.querySelector("button.delete");
      let checkBox = taskListItem.querySelector("input[type=checkbox]");
      deleteButton.onclick = deleteTask;
      checkBox.onchange = checkBoxEventHandler;
    } else {
      let editButton = taskListItem.querySelector("button.edit");
      let deleteButton = taskListItem.querySelector("button.delete");
      let checkBox = taskListItem.querySelector("input[type=checkbox]");
      editButton.onclick = editTask;
      deleteButton.onclick = deleteTask;
      checkBox.onchange = checkBoxEventHandler;
    }
  }

  mark_task_completed (incomplete_tasks_holder, completed_tasks_holder, tasks_store) {
    let listItem = this.parentNode;
    let id = listItem.attributes.id.value

    tasks_store.get_todo_tasks().forEach(el => {
      if (el.id === id)
        el.is_completed = true;
    })
    this.rerender_all_tasks_in_DOM(incomplete_tasks_holder, completed_tasks_holder)
  }

   mark_task_incomplete (incomplete_tasks_holder, completed_tasks_holder, tasks_store) {
    let listItem = this.parentNode;
    let id = listItem.attributes.id.value

    tasks_store.get_completed_tasks().forEach(el => {
      if (el.id === id)
        el.is_completed = false;
    })
     this.rerender_all_tasks_in_DOM(incomplete_tasks_holder, completed_tasks_holder)
  }
}