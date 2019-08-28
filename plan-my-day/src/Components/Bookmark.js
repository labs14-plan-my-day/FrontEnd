import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";

const styles = theme => ({
  bookmarkMainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  bookmarkListToggle: {
    width: "100%",
    minWidth: "150px",
    margin: "0 auto",
    backgroundColor: "white",
    [theme.breakpoints.down("xs")]: {
      // display: "flex",
      width: "100%"
    }
  },
  bookmarkToggleText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "100%"
    }
  },
  listItem: {
    display: "flex",
    fontWeight: 300,
    width: "100%",
    padding: ".5rem",
    maxHeight: "2.5rem",

    alignItems: "center",
    alignContent: "center",
    "& $bookmarkAddIcon": {
      opacity: 0
    },
    "&:hover": {
      fontWeight: 500,

      backgroundColor: "white",
      cursor: "pointer",
      "& $bookmarkAddIcon": {
        opacity: 1
      }
    }
  },
  bookmarkAddIcon: {
    opacity: 0
  },
  bookmarkedTime: {
    color: "#757575",
    marginRight: "2rem"
  },
  taskName: {
    fontSize: "16px",
    fontWeight: 500
  },
  taskNameAndAddIcon: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center"
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

    const { tasks } = this.props;

    const bookmarkedTasksList = tasks.filter(task => {
      return task.bookmark;
    });
    return (
      <div className={this.props.classes.bookmarkMainContainer}>
        <Tooltip title="Bookmarked tasks" placement="right-start">
          <Button
            variant="contained"
            className={this.props.classes.bookmarkListToggle}
            onClick={this.handleExpandClick}
          >
            {/* <Icon>bookmarks</Icon> */}
            {/* <Typography
            variant="subtitle 1"
            className={this.props.classes.bookmarkToggleText}
          >
            Bookmarked Tasks
          </Typography> */}
            {this.state.open ? <ExpandMore /> : <ExpandLess />}
          </Button>
        </Tooltip>
        <Paper>
          {bookmarkedTasksList &&
            bookmarkedTasksList.map(bookmarkedTask => (
              <Collapse in={!this.state.open} timeout="auto" unmountOnExit>
                <List>
                  <ListItem
                    className={this.props.classes.listItem}
                    key={bookmarkedTask.id}
                    onClick={e => {
                      this.onSubmitAddTask(bookmarkedTask);
                    }}
                  >
                    {/* <Typography
                      variant="body2"
                      id="start_time"
                      name="start_time"
                      value={this.state.task.start_time}
                      className={this.props.classes.bookmarkedTime}
                    >
                      {bookmarkedTask.start_time}
                    </Typography> */}

                    <Tooltip title="add task to today's plan">
                      <div className={this.props.classes.taskNameAndAddIcon}>
                        <Typography
                          variant="body2"
                          id="name"
                          name="name"
                          className={this.props.classes.taskName}
                          value={this.state.task.name}
                        >
                          {bookmarkedTask.name}
                        </Typography>
                        <Icon className={this.props.classes.bookmarkAddIcon}>
                          note_add
                        </Icon>
                      </div>
                    </Tooltip>
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
