import React from 'react';
import { Task } from '../models/Task';

const TaskContext = React.createContext<ReadonlyArray<Task>>([]);

export default TaskContext;