import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(1),
    color: "#512da8"
  },
  progressCircle: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    width: "90%",
    margin: "0 auto",
    marginBottom: "2rem",
    marginTop: "2rem",
    height: "3.5rem",
    padding: ".5rem"
  }
}));

export default function TaskProgress(props) {
  const classes = useStyles();
  const { tasks, handleCheck, activeStep, handleRemove } = props;
  const [completed, setCompleted] = React.useState(0);

  function getCompletedCount() {
    return tasks.filter(task => {
      return task.checked === true;
    }).length;
  }

  useEffect(() => {
    console.log(completed);
    setCompleted(Math.floor((getCompletedCount() / tasks.length) * 100));
  }, [tasks]);

  return (
    <Paper className={classes.progressCircle}>
      <div className={classes.progressContainer}>
        <CircularProgress
          className={classes.progress}
          variant="static"
          value={completed}
          thickness={8}
          size={45}
        />
      </div>
      <Typography variant="body1">
        You have {getCompletedCount()} / {tasks.length} of your tasks completed.
        Let's finish the day strong!
      </Typography>
    </Paper>
  );
}
