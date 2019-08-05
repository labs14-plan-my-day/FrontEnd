import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

const useStyles = makeStyles(theme => ({
  progress: {
    color: "#512da8",
    marginRight: ".5rem",
    [theme.breakpoints.down("xs")]: {
      height: "70%"
    }
  },
  progressText: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "100%"
    }
  },
  defaultText: {
    textAlign: "center",
    width: "100%",
    marginRight: "4rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      width: "100%",
      margin: "0 auto",
      textAlign: "center"
    }
  },
  progressMainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "85%",
    margin: "0 auto",
    marginBottom: "2rem",
    marginTop: "2rem",
    height: "3.5rem",
    padding: ".5rem",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "0 auto",
      marginTop: "1.5rem",
      marginBottom: "1.5rem"
    }
  },
  progressCircleAndContent: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: "56%",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }
}));

export default function TaskProgress(props) {
  const classes = useStyles();
  const { tasks } = props;
  const [completed, setCompleted] = React.useState(0);

  function getCompletedCount() {
    return tasks.filter(task => {
      return task.status === 3;
    }).length;
  }

  useEffect(() => {
    setCompleted(Math.floor((getCompletedCount() / tasks.length) * 100));
  }, [tasks]);

  return (
    <Paper className={classes.progressMainContainer}>
      <div className={classes.progressCircleAndContent}>
        <div className={classes.progressCircleContainer}>
          <CircularProgress
            className={classes.progress}
            variant="static"
            value={completed}
            thickness={8}
            size={45}
          />
        </div>
        <Typography
          variant="body1"
          className={completed ? classes.progressText : classes.defaultText}
        >
          {completed > 0 && completed !== 100
            ? `You have ${getCompletedCount()} / ${tasks.length} of your tasks
          completed.`
            : completed === 100
            ? `You've completed all of your tasks. Awesome job!`
            : "Let's get started on your day!"}
        </Typography>
      </div>
    </Paper>
  );
}