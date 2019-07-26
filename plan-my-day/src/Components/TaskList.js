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
    width: "90%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      // display: "flex",
      // justifyContent: "center",
      width: "100%"
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
    color: "green",
    fontWeight: 700
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: "grey",
      borderWidth: "4px"
    }
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: "green",
      borderWidth: "4px"
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
      activeStep
    } = this.props;

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

    return (
      <div className={this.props.classes.root}>
        {console.log(this.props.classes)}
        <Stepper
          orientation="vertical"
          activeStep={activeStep}
          connector={connector}
        >
          {tasks &&
            tasks.map((task, index) => {
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
                            handleCheck(task.id);
                          }}
                          fontSize="large"
                          className={
                            stepProps.completed
                              ? this.props.classes.completedTask
                              : ""
                          }
                        >
                          {stepProps.completed
                            ? "check_circle"
                            : "radio_button_unchecked"}
                        </Icon>
                      </Tooltip>
                    }
                  >
                    <List>
                      <ListItem>
                        <Paper
                          className={
                            stepProps.completed
                              ? this.props.classes.taskItemCompleted
                              : this.props.classes.taskItem
                          }
                        >
                          <Task
                            key={task.id}
                            task={task.name}
                            id={task.id}
                            handleRemove={handleRemove}
                            handleCheck={handleCheck}
                          />
                        </Paper>
                      </ListItem>
                      {/* <Divider /> */}
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
