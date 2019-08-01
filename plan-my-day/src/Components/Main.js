import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
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
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import { Container } from "reactstrap";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useAuth0 } from "./react-auth0-spa";

const styles = theme => ({
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
        <Router>
          <NavBar />
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <Home {...props} handleClick={this.handleClick} />
              )}
            />
          </div>

          {this.state.tasks && (
            <div>
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
                    handleBookmark={this.handleBookmark}
                  />
                )}
              />
              <div>
                <Route
                  exact
                  path="/addtask"
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
            </div>
          )}
          <div className={this.props.classes.mainFooterContainer}>
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default withStyles(styles)(Main);
