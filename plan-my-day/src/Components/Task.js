import React, { Component, PropTypes } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";

const styles = theme => ({
  listElementStyles: {
    fontSize: "22px",
    fontWeight: 300,
    color: "black",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px"
    }
  },
  listElementCheckedStyles: {
    fontSize: "22px",
    color: "#0E8B5B",
    fontWeight: 500,
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
      color: "#0E8B5B"
    }
  },
  listElementStylesDesc: {
    fontSize: "16px",
    fontWeight: 300,
    color: "black",
    fontStyle: "italic",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      margin: "0 auto",
      textAlign: "center"
    }
  },
  listElementCheckedStylesDesc: {
    fontSize: "16px",
    color: "#0E8B5B",
    fontWeight: 500,
    fontStyle: "italic",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      color: "#0E8B5B",
      margin: "0 auto",
      textAlign: "center"
    }
  },
  taskPanel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center"
    }
  },
  startTime: {
    marginRight: "2rem",
    color: "darkGrey",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      margin: "0 auto"
    }
  },
  startTimeText: {
    fontWeight: 500,
    fontSize: "16px",
    color: "darkGrey",
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      margin: "0 auto"
    }
  },
  taskContent: {
    // border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    }
  },
  taskButtonsAndContent: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    }
  },
  deleteButton: {
    color: "#c62828",
    "&:hover": {
      color: "#7f0000"
    }
  },
  bookmarkIcon: {
    "&:hover": {
      color: "#512da8"
    }
  },
  bookmarkIconSelected: {
    color: "#512da8"
  },
  bookmarkButton: {
    "&:hover": {
      color: "#512da8"
    }
  },
  buttons: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    }
  },
  lowPriority: {
    marginTop: ".5rem",
    color: "rgba(0,0,0,.7)",
    fontweight: 500,
    backgroundColor: "#eeeeee",
    borderWidth: ".3px",
    height: "25px",
    fontSize: "12px",
  },
  medPriority: {
    marginTop: ".5rem",
    color: "rgba(0,0,0,.7)",
    fontweight: 500,
    backgroundColor: "#fff9c4",
    borderWidth: ".3px",
    height: "25px",
    fontSize: "12px",
  },
highPriority: {
  marginTop: ".5rem",
    color: "rgba(0,0,0,.7)",
    fontweight: 500,
    backgroundColor: "rgba(255, 158, 128, .5)",
    borderWidth: ".3px",
    height: "25px",
    fontSize: "12px",
  }
});

class Task extends Component {

  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
  }

  onRemove(event) {
    this.props.handleRemove(this.props.id);
  }

  onBookmark(event) {
    this.props.handleBookmark(this.props.task);
    console.log("Handle Bookmark", this.props.task.bookmark);
  }


  render() {
    const { task, status, handleRemove, handleBookmark } = this.props;
    const checked = status === 3;
    const listStyles = !checked
      ? this.props.classes.listElementStyles
      : this.props.classes.listElementCheckedStyles;

  
const convertImportanceToLabel = (taskImportance) => {
    switch (taskImportance) {
      case 1:
        return "Low";
        break;
      case 2:
       return "Medium";
        break;
     case 3:
        return "High";
        break;
      default:
        console.error("Invalid code");
    }
  }

    return (
      <div className={this.props.classes.taskPanel}>
        <div className={this.props.classes.startTime}>
          <Typography
            className={this.props.classes.startTimeText}
            variant="body1"
          >
            {task.start_time}
          </Typography>
        </div>
        <div className={this.props.classes.taskButtonsAndContent}>
          <div className={this.props.classes.taskContent}>
            <Typography
              variant="body1"
              className={
                !checked
                  ? this.props.classes.listElementStyles
                  : this.props.classes.listElementCheckedStyles
              }
            >
              {task.name}
            </Typography>
            <Typography
              className={
                !checked
                  ? this.props.classes.listElementStylesDesc
                  : this.props.classes.listElementCheckedStylesDesc
              }
            >
              {task.description}
            </Typography>
            <Chip label={convertImportanceToLabel(task.importance)} className={task.importance === 1 ? this.props.classes.lowPriority : task.importance === 2 ? this.props.classes.medPriority : task.importance === 3 ? this.props.classes.highPriority : ""} variant="outlined" />
          </div>
          <div className={this.props.classes.buttons}>
            <Tooltip title="Delete task" placement="bottom-end">
              <IconButton onClick={this.onRemove} fontSize="medium">
                <Icon className={this.props.classes.deleteButton}>
                  remove_circle
                </Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Bookmark task" placement="bottom-end">
              <IconButton
                onClick={this.onBookmark}
                className={this.props.classes.bookmarkButton}
                fontSize="medium"
              >
                <Icon
                  className={
                    !task.bookmark
                      ? this.props.classes.bookmarkIcon
                      : this.props.classes.bookmarkIconSelected
                  }
                >
                  bookmark
                </Icon>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
