import React, {useEffect} from 'react';
import './App.css';
import {TaskList} from "./components/TaskList/TaskList";
import store from "./redux/store";
import {Provider, useDispatch} from "react-redux";
import {fetchTasks_actionCreator} from "./redux/actions/actionCreators";

function App() {

  useEffect(() => {
    store.dispatch(fetchTasks_actionCreator())
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Tasks App
        <div className="TasksApp" data-testid="TasksApp">
          <Provider store={store}>
            <TaskList />
          </Provider>
        </div>
      </header>
    </div>
  );
}

export default App;