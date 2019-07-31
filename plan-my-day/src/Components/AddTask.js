import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class AddTask extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      inputValue: ""
    };
  }

  onClick(event) {
    event.preventDefault();
    var task = this.state.inputValue;
    if (task == "") return;
    else {
      var form = document.getElementById("addTask");
      form.reset();
      this.props.handleClick(task);
      this.state.inputValue = "";
    }
    this.props.history.push("/tasks");
  }

  render() {

    return (
      <div style={{ marginLeft: "30%", width: "60%" }}>
        <form id="addTask">
          <Paper style={{ width: "60%", leftMargin: "0px" }} zDepth={1}>
            <div style={{ marginLeft: "20px", width: "92%" }}>
              <TextField
                hintText="Add a Task"
                className="AddText"
                fullWidth={true}
                onChange={e => this.setState({ inputValue: e.target.value })}
              />
            </div>
          </Paper>
          <br />
          <Button
            style={{ width: "60%" }}
            type="submit"
            label="Add Task"
            primary={true}
            onClick={this.onClick}
          >
            Add Task
          </Button>
        </form>
      </div>
    );
  }
}

export default AddTask;
