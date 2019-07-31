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
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import StepIcon from "@material-ui/core/StepIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";
import Task from "./Task";

const styles = theme => ({
  root: {
    width: "95%",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "74%",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center"
    }
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  completedTask: {
    color: "#0E8B5B",
    fontWeight: 700,
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px"
    }
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: "grey",
      borderWidth: "3px"
    },
    [theme.breakpoints.down("xs")]: {
      borderColor: "grey",
      borderWidth: "3px"
    }
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: "#0E8B5B",
      borderWidth: "3px"
    },
    [theme.breakpoints.down("xs")]: {
      borderColor: "#0E8B5B",
      borderWidth: "3px"
    }
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: "transparent"
    }
  },
  connectorLine: {
    transition: theme.transitions.create("border-color")
  },
  taskItem: {
    width: "100%",
    padding: ".8rem",
    borderRadius: 3
  },
  taskItemCompleted: {
    width: "100%",
    padding: ".8rem",
    borderRadius: 3
  },
  taskListContainer: {
    [theme.breakpoints.down("xs")]: {
      width: "70%"
    }
  },
  stepMainContainer: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  stepLabelContainer: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px"
    }
  }
});

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("Props Tasks List", this.props.tasks);

    const {
      handleRemove,
      handleCheck,
      tasks,
      classes,
      activeStep,
      handleBookmark
    } = this.props;

    // console.log("Handle Bookmark", handleBookmark);
    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine
        }}
      />
    );

    const sortedTasks = tasks.sort(function(a, b) {
      return parseInt(a.start_time) - parseInt(b.start_time);
    });

    console.log("Sorted tasks", sortedTasks);
    return (
      <div className={this.props.classes.root}>
        {console.log(this.props.classes)}
        <Stepper
          orientation="vertical"
          activeStep={activeStep}
          connector={connector}
          className={this.props.classes.stepMainContainer}
        >
          {sortedTasks &&
            sortedTasks.map((task, index) => {
              const stepProps = {};
              const taskCompleted = task.status === 3;
              stepProps.completed = taskCompleted;
              return (
                <Step {...stepProps} key={task.id}>
                  <StepLabel
                    icon={
                      <Tooltip title="mark as complete" placement="top-left">
                        <Icon
                          onClick={e => {
                            handleCheck(task);
                          }}
                          fontSize="large"
                          className={
                            stepProps.completed
                              ? this.props.classes.completedTask
                              : this.props.classes.stepLabelContainer
                          }
                        >
                          {stepProps.completed
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </Icon>
                      </Tooltip>
                    }
                  >
                    <List className={this.props.classes.taskListContainer}>
                      <ListItem>
                        <div
                          className={
                            stepProps.completed
                              ? this.props.classes.taskItemCompleted
                              : this.props.classes.taskItem
                          }
                        >
                          <Task
                            task={task}
                            id={task.id}
                            status={task.status}
                            handleRemove={handleRemove}
                            handleCheck={handleCheck}
                            handleBookmark={handleBookmark}
                          />
                        </div>
                      </ListItem>
                      <Divider />
                    </List>
                  </StepLabel>
                </Step>
              );
            })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
