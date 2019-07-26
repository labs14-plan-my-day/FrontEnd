import React, { Component } from "react";
// import injectTapEventPlugin from "react-tap-event-plugin";
import { Route, Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import uuid from "uuid";
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

class Main extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, task: "test task", checked: false },
        { id: 2, task: "test task2", checked: false },
        { id: 3, task: "test task3", checked: false },
        { id: 4, task: "test task4", checked: false },
        { id: 5, task: "test task5", checked: false },
        { id: 6, task: "test task6", checked: false },
        { id: 7, task: "test task7", checked: false }
      ],
      open: false,
      activeStep: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleClick(task) {
    console.log(this.state);
    this.setState({
      tasks: [
        ...this.state.tasks,
        {
          id: uuid(),
          task: task,
          checked: false
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
    const finalTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.checked = !task.checked;
        const firstUnchecked = this.state.tasks.find(task => !task.checked);
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
          exact
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
            exact
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
    );
  }
}

export default withStyles(styles)(Main);
