import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Footer from "../Components/Footer";
import AddTask from "../Components/AddTask";
import TaskList from "../Components/TaskList";
import Alert from "../Components/Alert";

import PrivateRoute from "../Components/PrivateRoute";

const styles = theme => ({
  mainFooterContainer: {
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto"
    }
  }
});
// class Comments extends Component {
//   state = {
//     tasks: []
//   };
//   componentDidMount() {
//     const endpoint = "https://plan-my-dayapp.herokuapp.com/comments";

//     axios
//       .get(endpoint)
//       .then(res => {
//         this.setState({
//           tasks: res.data.comment
//         });
//         console.log(this.state.tasks, "this are the comments");
//       })
//       .catch(error => {
//         console.error("COMMENTS ERROR", error);
//       });
//   }
//   render() {
//     return (
//       <div>
//         <form onSubmit={() => this.props.addNewComment}>
//           <input
//             className="comment-input"
//             type="text"
//             value={this.props.text}
//             placeholder="Add a comment..."
//             onChange={this.props.commentValueChange}
//             name="text"
//           />
//         </form>
//         ;
//       </div>
//     );
//   }
// }


const TASK_STATUS_CODES = {
  STATUS_INCOMPLETE: 1,
  STATUS_IN_PROGRESS: 2,
  STATUS_COMPLETE: 3
};

class Main extends Component {
  state = {
    currentUserID: localStorage.getItem("currentUserID"),
    tasks: [],
    open: false,
    activeStep: 0
  };

  componentDidMount() {
    console.log(this.state);
    this.refetchAllTasks();
    this.setState({ currentUserID: localStorage.getItem("currentUserID") });
  }

  refetchAllTasks = () => {
    setTimeout(() => {
      const endpoint = `https://plan-my-dayapp.herokuapp.com/tasks/user/${localStorage.getItem(
        "currentUserID"
      )}`;
      console.log("refetching all tasks", endpoint);
      console.log(this.state.currentUserID);

      axios
        .get(endpoint)
        .then(res => {
          this.setState({
            tasks: res.data
          });
          // this.setState({
          //   activeStep: this.getActiveStep()
          // });
        })
        .catch(error => {
          console.error("USERS ERROR", error);
        });
    }, 200);
  };

  handleClick = task => {
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
  };

  handleRemove = id => {
    const finalTasks = this.state.tasks.filter(task => {
      if (task.id !== id) return task;
    });
    this.setState({
      tasks: finalTasks,
      open: true
    });
  };

  handleRemove = id => {
    console.log("delete");
    axios
      .delete(`https://plan-my-dayapp.herokuapp.com/tasks/${id}`)
      .then(res => {
        this.setState({
          tasks: this.state.tasks.filter(task => task.id !== id)
        });
      })
      .catch(err => console.log(err.message, "delete"));
  };

  setStatus = task => {
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
  };

  getActiveStep = () => {
    console.log("Teeeyasks", this.state.tasks);
    if (this.state.tasks.length) {
      const firstUnchecked = this.state.tasks.find(
        task => task.status === TASK_STATUS_CODES.STATUS_INCOMPLETE
      );
      return firstUnchecked
        ? this.state.tasks.indexOf(firstUnchecked)
        : this.state.tasks.length;
    } else {
      this.getActiveStep();
    }
  };

  setBookmark = task => {
    // toggling bookmark status
    return (task.bookmark = !task.bookmark);
  };

  updateTasks = (updateFunc, taskToUpdate) => {
    return this.state.tasks.map(task => {
      if (taskToUpdate.id === task.id) {
        updateFunc(task);
      }
      return task;
    });
  };

  handleCheck = task => {
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
  };

  handleBookmark = task => {
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
  };

  handleRemove = id => {
    console.log("delete");
    axios
      .delete(`https://plan-my-dayapp.herokuapp.com/tasks/${id}`)
      .then(res => {
        this.setState({
          tasks: this.state.tasks.filter(task => task.id !== id)
        });
      })
      .catch(err => console.log(err.message, "delete"));
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    console.log(this.props, "the props");
    return (
      <>
        {this.state.tasks && (
          <div>
            <Alert/>
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
                  refetchAllTasks={this.refetchAllTasks}
                />
              )}
            />
            <div>
              <Route
                exact
                path="/tasks"
                render={props => (
                  <AddTask {...props} refetchAllTasks={this.refetchAllTasks} />
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
      </>
    );
  }
}

export default withStyles(styles)(Main);
