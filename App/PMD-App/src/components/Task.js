import React from 'react';

const Task = props => {
  const { task } = props;
  return (

    <div className='taskDiv'>

      <button className='deleteBtn' type="submit" onClick={(event) => props.deleteTask(event, task.id)}>X</button>

      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Time: {task.time}</p>
      
    </div>
    
  );
}

export default Task;
