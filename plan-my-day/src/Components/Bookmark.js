import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import StepIcon from "@material-ui/core/StepIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";
import Task from "./Task";

const styles = theme => ({
  bookmarkListToggle: {
    width: "100%",
    margin: "0 auto",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      // display: "flex",
      // justifyContent: "center",
      width: "100%"
    }
  },
  listItem: {
    fontWeight: 300,
    width: "100%",
    height: "2rem",
    "& $bookmarkAddIcon": {
      opacity: 0
    },
    "&:hover": {
      fontWeight: 500,
      fontWeight: "bold",
      backgroundColor: "white",
      cursor: "pointer",
      "& $bookmarkAddIcon": {
        opacity: 1
      }
    }
  },
  bookmarkAddIcon: {
    opacity: 0
  }
});

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      open: true
    };
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

  addTask = newTask => {
    console.log("New Task", newTask);
    const {
      alert,
      bookmark,
      date,
      description,
      end_time,
      importance,
      name,
      start_time,
      status,
      user_id
    } = newTask;

    const task = {
      alert,
      bookmark,
      date,
      description,
      end_time,
      importance,
      name,
      start_time,
      status,
      user_id
    };

    return axios
      .post("https://plan-my-dayapp.herokuapp.com/tasks", task)
      .then(res => {
        return [...this.props.tasks, task];
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    e.persist();
    this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmitAddTask = task => {
    // e.preventDefault();
    console.log(this.props);
    // const task = {
    //   ...this.state.task
    // };
    this.addTask(task).then(tasks => {
      console.log("Le Tasks", tasks);
      this.setState({
        tasks: tasks,
        task: task
      });
      return this.props.history.go("/tasks");
    });
  };

  handleExpandClick = e => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  };

  render() {
    // console.log("Props Tasks List", this.props.tasks);

    const {
      handleRemove,
      handleCheck,
      tasks,
      classes,
      activeStep
    } = this.props;

    const bookmarkedTasksList = tasks.filter(task => {
      return task.bookmark;
    });
    return (
      <div>
        <Button
          variant="contained"
          className={this.props.classes.bookmarkListToggle}
          onClick={this.handleExpandClick}
        >
          <Icon>bookmarks</Icon>
          <Typography variant="subtitle 1">Bookmarked Tasks</Typography>
          {this.state.open ? <ExpandMore /> : <ExpandLess />}
        </Button>
        <Paper>
          {bookmarkedTasksList &&
            bookmarkedTasksList.map(bookmarkedTask => (
              <Collapse in={!this.state.open} timeout="auto" unmountOnExit>
                <List>
                  <ListItem
                    className={this.props.classes.listItem}
                    onClick={e => {
                      this.onSubmitAddTask(bookmarkedTask);
                    }}
                  >
                    <p
                      key={bookmarkedTask.id}
                      id="name"
                      name="name"
                      value={this.state.task.name}
                    >
                      {bookmarkedTask.name}
                    </p>
                    <Icon className={this.props.classes.bookmarkAddIcon}>
                      note_add
                    </Icon>
                  </ListItem>
                  <Divider />
                </List>
              </Collapse>
            ))}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Bookmark);
