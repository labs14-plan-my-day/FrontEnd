import React, { Component, PropTypes } from "react";
// import { red600 } from "@material-ui/core/colors/red";
// import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";

// const listElementStyles = {
//   fontSize: 26,
//   lineHeight: "26px"
// };

// const listElementCheckedStyles = {
//   ...listElementStyles,
//   textDecoration: "line-through"
// };

const styles = theme => ({
  listElementStyles: {
    fontSize: "24px",
    lineHeight: "26px",
    fontWeight: 300,
    color: "black",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
      // flexDirection: "column",
      // justifyContent: "center"
    }
  },
  listElementCheckedStyles: {
    fontSize: "24px",
    lineHeight: "26px",
    color: "green",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      color: "green"
      // flexDirection: "column",
      // justifyContent: "center"
    }
  },
  listElementStylesDesc: {
    fontSize: "16px",
    fontWeight: 300,
    color: "black",
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px"
      // flexDirection: "column",
      // justifyContent: "center"
    }
  },
  listElementCheckedStylesDesc: {
    fontSize: "16px",
    lineHeight: "26px",
    color: "green",
    fontWeight: 500,
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      color: "green"
      // flexDirection: "column",
      // justifyContent: "center"
    }
  },
  taskPanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "flex"
      // flexDirection: "column",
      // justifyContent: "center"
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
  }
});

class Task extends Component {
  // static propTypes = {
  //   task: PropTypes.string
  // };

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
    return (
      <div className={this.props.classes.taskPanel}>
        <div>
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
        </div>
        <div>
          {/* <Checkbox onChange={this.onCheck} style={{ marginTop: 12 }} /> */}
          <Tooltip title="Delete task" placement="bottom-end">
            <IconButton onClick={this.onRemove} fontSize="medium">
              <Icon className={this.props.classes.deleteButton}>
                remove_circle
              </Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Bookmark task" placement="bottom-end">
            <IconButton onClick={this.onBookmark} fontSize="medium">
              <Icon className={this.props.classes.bookmarkIcon}>bookmark</Icon>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
