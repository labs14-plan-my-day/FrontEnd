import React, { Component } from "react";
import { getTasks, addTask, deleteTask } from "../actions";
import Tasks from "./Tasks";
import "./App.css";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    title: "",
    description: "",
    time: ""
  };

  componentDidMount() {
    this.props.getTasks();
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addTask = event => {
    event.preventDefault();

    const { title, description, time } = this.state;
    this.props.addTask({ title, description, time });
    this.setState({ title: "", description: "", time: "" });
  };

  deleteTask = (event, id) => {
    event.preventDefault();
    this.props.deleteTask(id);
  };

  render() {
    const { tasks, fetchingTasks, error } = this.props;
    const { title, description, time } = this.state;

    if (fetchingTasks) {
      return <h2 className="App">Loading...</h2>;
    } else if (error) {
      return <h2 className="App">Not Found</h2>;
    } else {
      return (
        <div className="App">
          <h1>Plan My Day</h1>

          <form onSubmit={this.addTask}>
            <h3>Add Task</h3>
            <input
              placeholder="...Task?"
              type="text"
              name="title"
              value={title}
              onChange={this.handleInput}
            />

            <input
              placeholder="...Description?"
              type="text"
              name="description"
              value={description}
              onChange={this.handleInput}
            />

            <input
              placeholder="...Time?"
              type="text"
              name="time"
              value={time}
              onChange={this.handleInput}
            />

            <button className="addBtn" type="submit">
              {" "}
              Add{" "}
            </button>
          </form>

          <h1>Tasks</h1>
          <Tasks tasks={tasks} deleteTask={this.deleteTask} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    tasks: state.tasks,
    fetchingTasks: state.fetchingTasks,
    addingTask: state.addingTask,
    error: state.error
  };
};

export default withRouter(mapStateToProps, { getTasks, addTask, deleteTask })(
  App
);
