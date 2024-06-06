import React from 'react';
import './App.css';
import {TaskList} from "./components/TaskList/TaskList";
import {TaskContextProvider} from "./contexts/TaskContext";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Tasks App
        <div className="TasksApp">
          <TaskContextProvider>
            <TaskList />
          </TaskContextProvider>
        </div>
      </header>
    </div>
  );
}

export default App;