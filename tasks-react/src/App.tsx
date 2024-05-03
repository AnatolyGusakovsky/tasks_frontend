import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskComponent} from "./components/task/task";

const testDataObj = {
  id: "id_425363",
  text: "Clean table!",
  isCompleted: false,
  isDeleted: false
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="TasksApp">
          <TaskComponent task={testDataObj}/>
        </div>
        <p data-testid="instruction-text">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
