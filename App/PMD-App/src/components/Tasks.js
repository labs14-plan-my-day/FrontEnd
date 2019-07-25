import React from 'react';
import Task from './Task';

const Tasks = props => {
  return (

    <div>
      {props.tasks.map((task, event) => 
        <Task key={event} task={task}
         deleteTask={props.deleteTask} />)}
    </div>
    
  );
}

export default Tasks;
