import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import uuid from "uuid";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import TaskProgress from "./TaskProgress";
import Bookmark from "./Bookmark";
import Home from "./Home";

const styles = theme => ({
  mainPageContainer: {
    display: "flex",
    margin: "0 auto",
    marginTop: "1rem",
    width: "100%",
    // justifyContent: "space-around",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    }
  },
  mainTaskContainer: {
    width: "65%",
    margin: "0 auto",
    marginTop: "4rem",
    padding: "1rem",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      marginTop: "2rem"
    }
  },
  bookmarkContainer: {
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      marginTop: "1rem"
    }
  },
  h1: {
    fontSize: "30px",
    fontWeight: 400,
    display: "flex",
    justifyContent: "center",
    paddingTop: "2rem",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  h2: {
    fontSize: "18px",
    fontWeight: 300,
    display: "flex",
    justifyContent: "center",
    paddingTop: "2rem",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  },
  mainFooterContainer: {
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto"
    }
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
      tasks: [],
      open: false,
      activeStep: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.getActiveStep = this.getActiveStep.bind(this);
  }

  componentDidMount() {
    const endpoint = "https://plan-my-dayapp.herokuapp.com/tasks";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({
          tasks: res.data.tasks
        });
        this.setState({
          activeStep: this.getActiveStep()
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

  setStatus(task) {
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
    return task;
  }

  getActiveStep() {
    console.log("Teeeyasks", this.state.tasks);
    const firstUnchecked = this.state.tasks.find(
      task => task.status === TASK_STATUS_CODES.STATUS_INCOMPLETE
    );
    return firstUnchecked
      ? this.state.tasks.indexOf(firstUnchecked)
      : this.state.tasks.length;
  }

  setBookmark(task) {
    // toggling bookmark status
    return (task.bookmark = !task.bookmark);
  }

  updateTasks(updateFunc, taskToUpdate) {
    return this.state.tasks.map(task => {
      if (taskToUpdate.id === task.id) {
        updateFunc(task);
      }
      return task;
    });
  }

  handleCheck(task) {
    const { id } = task;
    const updatedTasks = this.updateTasks(this.setStatus, task);
    axios
      .put(`https://plan-my-dayapp.herokuapp.com/tasks/${id}`, task)
      .then(res => {
        this.setState({
          tasks: updatedTasks,
          activeStep: this.getActiveStep()
        });
      });
  }

  handleBookmark(task) {
    const { id } = task;
    const updatedTasks = this.updateTasks(this.setBookmark, task);
    axios
      .put(`https://plan-my-dayapp.herokuapp.com/tasks/${id}`, task)
      .then(res => {
        this.setState({
          tasks: updatedTasks,
          activeStep: this.getActiveStep()
        });
      });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <>
        <div className={this.props.classes.mainPageContainer}>
          <div className={this.props.classes.bookmarkContainer}>
            <Bookmark
              {...this.props}
              tasks={this.state.tasks}
              handleCheck={this.handleCheck}
              activeStep={this.state.activeStep}
              handleBookmark={this.handleBookmark}
            />
          </div>
          <div className={this.props.classes.mainTaskContainer}>
            {this.state.tasks && (
              <Paper>
                <Typography variant="h1" className={this.props.classes.h1}>
                  Plan My Day
                </Typography>
                <Typography variant="h2" className={this.props.classes.h2}>
                  What do you need to get done today?
                </Typography>
                <TaskProgress
                  tasks={this.state.tasks}
                  handleRemove={this.handleRemove}
                  handleCheck={this.handleCheck}
                  activeStep={this.state.activeStep}
                />
                <Route
                  exact
<<<<<<< HEAD
                  path="/tasks"
=======
                  path="/addtask"
>>>>>>> c4a1a1212aa86610cb58d36e93ce6b622186ce8e
                  render={props => (
                    <TaskList
                      {...props}
                      tasks={this.state.tasks}
                      activeStep={this.state.activeStep}
                      handleRemove={this.handleRemove}
                      handleCheck={this.handleCheck}
                      handleBookmark={this.handleBookmark}
                    />
                  )}
                />
<<<<<<< HEAD
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
            )}
          </div>
        </div>
        <div className={this.props.classes.mainFooterContainer}>
          <Footer />
=======
              </div>
              <div>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home {...props} handleClick={this.handleClick} />
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
>>>>>>> c4a1a1212aa86610cb58d36e93ce6b622186ce8e
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Main);
