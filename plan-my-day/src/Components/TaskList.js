import React, { Component, PropTypes } from 'react';
import List from 'material-ui/List';

import Task from './Task';

class TaskList extends Component {
  static propTypes = { 
      handleRemove: PropTypes.func,
      handleCheck: PropTypes.func,
      tasks: PropTypes.array,
  }

  constructor(props) {
    super(props);
  }
  render() {
    const {
      handleRemove,
      handleCheck,
      tasks,
    } = this.props;

    var taskNode = tasks.map((task) => {
    return (
      <Task 
        key={ task.id } 
        task={ task.task } 
        id = {task.id}
        checked = { task.checked }
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
    )
  })
    return(
      <List style={{marginLeft: '5%'}}>
      <ul>{ taskNode }</ul>
    </List>
    )
  }
}
  
export default TaskList