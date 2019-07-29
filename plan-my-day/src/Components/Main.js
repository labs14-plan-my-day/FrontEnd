import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import uuid from 'uuid';
import { grey700 } from 'material-ui/styles/colors';

import AddTask from './AddTask';
import TaskList from './TaskList';


injectTapEventPlugin();

class Main extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleClick(task) {
    console.log(this.state)
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id:uuid(),
          task:task,
          checked:false,
        }
      ]

    })
  }

  handleRemove(id) {
      const finalTasks = this.state.tasks.filter((task) => {
        if(task.id != id) return task
      });
      this.setState({
        tasks: finalTasks,
        open: true,
      });
  }

  handleCheck(id) {
    const finalTasks = this.state.tasks.map((task) => {
        if(task.id === id){
          task.checked =! task.checked
        } 
        return task
      });
      this.setState({
        tasks: finalTasks,
      });
  } 

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  
  render() {
    return (
      <MuiThemeProvider>
       <Paper 
          style={{paddingBottom: '30px', marginTop: 100, marginBottom: 100, marginRight: 20, marginLeft: 40}}>
          <div 
          style={{
            display: 'flex',
            
          }}
          >
            <div style={{marginLeft: '44%'}}>
              <h1 style={{ textAlign: 'center', color: grey700}}>
                Plan My Day 
              </h1>
            </div>
            <div style={{ marginRight:'10%', marginTop: 13}}>

            </div>
          </div>
          
          <TaskList 
            tasks={this.state.tasks}
            handleRemove={this.handleRemove} 
            handleCheck={this.handleCheck} 
          />
          <br />
          <div style={{marginLeft: '5%'}}>
           <AddTask handleClick={this.handleClick}/>
          </div>
          <Snackbar
          open={this.state.open}
          message="Task deleted"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        </Paper>
        
      
      </MuiThemeProvider>
      
    );
  }
}

export default Main;