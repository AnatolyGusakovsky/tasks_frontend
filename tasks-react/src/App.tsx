import React from 'react';
import './App.css';
import {TaskList} from "./components/TaskList/TaskList";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="TasksApp">
          <TaskList/>
        </div>
        <p data-testid="instruction-text">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
