import React, { Component, PropTypes } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import "typeface-roboto";


const styles = theme => ({
  listElementStyles: {
    fontSize: "26px",
    lineHeight: "26px",
    fontWeight: 300,
    color: "black",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px"
    }
  },
  listElementCheckedStyles: {
    fontSize: "26px",
    lineHeight: "26px",
    color: "green",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      color: "green"
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
    }
  },
  deleteButton: {
    color: "#c62828",
    "&:hover": {
      color: "#7f0000"
    }
  }
});

class Task extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onClick(event) {
    this.props.handleRemove(this.props.id);
  }

  onCheck(event) {
    console.log(this.props.id);
    this.props.handleCheck(this.props.id);
  }

  render() {
    const { task, checked } = this.props;
    // const checked = task.status === 3;

    const listStyles = !checked
      ? this.props.classes.listElementStyles
      : this.props.classes.listElementCheckedStyles;
    return (
      <div className={this.props.classes.taskPanel}>
        <div
          className={
            !checked
              ? this.props.classes.listElementStyles
              : this.props.classes.listElementCheckedStyles
          }
        >
          {task}
        </div>
        <div>
          <Tooltip title="Delete task" placement="bottom-end">
            <IconButton onClick={this.onClick} fontSize="medium">
              <Icon className={this.props.classes.deleteButton}>
                remove_circle
              </Icon>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Task);
