import * as http from "http";
import {Tasks_store} from "../../frontend/tasks_store.mjs";
import {Task} from "../../frontend/task.mjs";
import {get_req_data} from "./utils.js";


const port = 3000;
const task_store = new Tasks_store()
task_store.add_task(new Task('123456', 'initial task text', false))

const server = http.createServer(async function (req, res) {

  // GET /api/todos
  if (req.url === '/api/todos' && req.method === "GET") {
    res.writeHead(200, {"Content-type": "application/json"})
    res.end(JSON.stringify(task_store.get_todo_tasks()))
  }

  // GET /api/todos/:id
  else if (req.url.match(/\/api\/todos\/(.{6})/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const task = task_store.get_task(id)
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(task));
    } catch (error) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: error}));
    }
  }

    // DELETE /api/todos/:id
  else if (req.url.match(/\/api\/todos\/(.{6})/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[3];
      const status = task_store.delete_task(id)
      if (status.includes('Error'))
        throw new Error(status)
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(status));
    } catch (error) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: error.message}));
    }
  }

  // PATCH /api/todos/:id
  else if (req.url.match(/\/api\/todos\/(.{6})/) && req.method === "PATCH") {
    try {
      const id = req.url.split("/")[3];
      let task = task_store.get_task(id)
      const data_received = await get_req_data(req)
      const updated_text = JSON.parse(data_received).text
      task.edit_text(updated_text)
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(`Task with ${id} was successfully updated.`));
    } catch (error) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: error}));
    }
  }

  // POST /api/todos/
  else if (req.url === "/api/todos" && req.method === "POST") {
    try {
      const task_body = JSON.parse(await get_req_data(req));
      console.log(task_body)
      if (task_body.hasOwnProperty('id') && task_body.hasOwnProperty('text') && task_body.hasOwnProperty('is_completed'))
        task_store.add_task(new Task(task_body.id, task_body.text, task_body.is_completed));
      else throw new Error('incoming data is malformed, aborting.')
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify('Task added'));
    } catch (error) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({message: error.message}));
    }
  } else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "Route not found"}));
  }
})

server.listen(port, function (error) {
  if (error) {
    console.log('error in server.listen', error)
  } else {
    console.log('server is listening on port: ' + port)
  }
})
//test