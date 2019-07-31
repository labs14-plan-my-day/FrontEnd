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
  progressText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px"
    }
  },
  progressMainContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    width: "90%",
    margin: "0 auto",
    marginBottom: "2rem",
    marginTop: "2rem",
    height: "3.5rem",
    padding: ".5rem",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      margin: "0 auto",
      marginTop: "1.5rem",
      marginBottom: "1.5rem"
    }
  }
}));

export default function TaskProgress(props) {
  const classes = useStyles();
  const { tasks, handleCheck, activeStep, handleRemove } = props;
  const [completed, setCompleted] = React.useState(0);

  function getCompletedCount() {
    return tasks.filter(task => {
      return task.status === 3;
    }).length;
  }

  useEffect(() => {
    // console.log(completed);
    setCompleted(Math.floor((getCompletedCount() / tasks.length) * 100));
  }, [tasks]);

  return (
    <Paper className={classes.progressMainContainer}>
      <div className={classes.progressCircleContainer}>
        <CircularProgress
          className={classes.progress}
          variant="static"
          value={completed}
          thickness={8}
          size={45}
        />
      </div>
      <Typography variant="body1" className={classes.progressText}>
        You have {getCompletedCount()} / {tasks.length} of your tasks completed.
      </Typography>
    </Paper>
  );
}
