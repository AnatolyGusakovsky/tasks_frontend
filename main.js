let tasks_arr = [];

function add_task(event){
    // event.preventDefault()
    let task_text = document.getElementById("task_field").value
    tasks_arr.push(task_text)
  console.log("task_text")
    console.log(task_text)
    // return false
  console.log("task_arr")
  console.log(tasks_arr)
}


console.log(tasks_arr)

