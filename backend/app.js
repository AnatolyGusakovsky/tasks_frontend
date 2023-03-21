const Tasks_store = require ("../frontend/tasks_store.js");
const Task = require ("../frontend/task.js");

const http = require('http')
const port = process.env.PORT;
const fs = require ('fs')
const task_store = new Tasks_store()
// task_store.add_task(new Task('1', 'task text', false))

const server = http.createServer(/*DO WE NEED ASYNC HERE?*/ function (req, res) {
  if(req.url === 'api/todos' && req.method === "GET"){
    res.writeHead(200, {"Content-type": "application/json"})
    res.end(JSON.stringify(task_store.get_todo_tasks()))
  }


  res.writeHead(200, {'Content-Type': 'text/html'})
  fs.readFile('index.html', function(error, data){
    if(error){
      res.writeHead(404)
      res.write('Error: File not found')
    }
    else{
      res.write(data)
    }
    res.end()
  })
})

server.listen(port, function (error) {
  if (error) {
    console.log('error in server.listen', error)
  } else {
    console.log('server is listening on port: ' + port)
  }
})