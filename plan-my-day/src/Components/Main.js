import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskProgress from "./TaskProgress";

const styles = theme => ({
  mainContainer: {
    width: "80%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  h1: {
    fontSize: "30px",
    fontWeight: 400,
    display: "flex",
    justifyContent: "center",
    paddingTop: "2rem"
  }
});

const TASK_STATUS_CODES = {
  STATUS_INCOMPLETE: 1,
  STATUS_IN_PROGRESS: 2,
  STATUS_COMPLETE: 3
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [{}],
      open: false,
      activeStep: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    const endpoint = "https://plan-my-dayapp.herokuapp.com/tasks";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          tasks: res.data.tasks
        });
      })
      .catch(error => {
        console.error("USERS ERROR", error);
      });
  }

  handleClick(task) {
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: task.id,
          task: task,
          status: TASK_STATUS_CODES.STATUS_INCOMPLETE
        }
      ]
    });
  }

  handleRemove(id) {
    const finalTasks = this.state.tasks.filter(task => {
      if (task.id != id) return task;
    });
    this.setState({
      tasks: finalTasks,
      open: true
    });
  }

  handleCheck(id) {
    console.log(this.state.tasks);
    const finalTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        const { status } = task;
        switch (status) {
          case TASK_STATUS_CODES.STATUS_INCOMPLETE:
            task.status = TASK_STATUS_CODES.STATUS_COMPLETE;
            break;
          case TASK_STATUS_CODES.STATUS_COMPLETE:
            task.status = TASK_STATUS_CODES.STATUS_INCOMPLETE;
            break;
          case TASK_STATUS_CODES.STATUS_IN_PROGRESS:
            task.status = TASK_STATUS_CODES.STATUS_COMPLETE;
            break;
          default:
            console.error("Invalid status code");
        }

        const firstUnchecked = this.state.tasks.find(
          task => task.status === TASK_STATUS_CODES.STATUS_INCOMPLETE
        );
        this.setState({
          activeStep: firstUnchecked
            ? firstUnchecked.id - 1
            : this.state.tasks[this.state.tasks.length - 1].id
        });
      }
      return task;
    });
    this.setState({
      tasks: finalTasks
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        {this.state.tasks && (
          <Paper className={this.props.classes.mainContainer}>
            <Typography variant="h1" className={this.props.classes.h1}>
              Plan My Day
            </Typography>
            <TaskProgress
              tasks={this.state.tasks}
              handleRemove={this.handleRemove}
              handleCheck={this.handleCheck}
              activeStep={this.state.activeStep}
            />
            <Route
              
              path="/tasks"
              render={props => (
                <TaskList
                  {...props}
                  tasks={this.state.tasks}
                  activeStep={this.state.activeStep}
                  handleRemove={this.handleRemove}
                  handleCheck={this.handleCheck}
                />
              )}
            />
            <br />
            <div>
              <Route
                
                path="/"
                render={props => (
                  <AddTask {...props} handleClick={this.handleClick} />
                )}
              />
            </div>
            <Snackbar
              open={this.state.open}
              message="Task deleted"
              autoHideDuration={2000}
              onRequestClose={this.handleRequestClose}
            />
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Main);