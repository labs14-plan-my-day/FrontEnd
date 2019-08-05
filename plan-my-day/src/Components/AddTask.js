import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
class AddTask extends Component {
  constructor(props) {
    super(props);
    // this.onClick = this.onClick.bind(this);
    this.state = {
      inputValue: "",
      tasks: [ {} ],
			task: { name: ''},
    };
  }fftyjstjsjt

  // onClick(event) {
  //   event.preventDefault();
  //   // var task = this.state.inputValue;
  //   if (task == "") return;
  //   else {
  //     var form = document.getElementById("addTask");
  //     // form.reset();
  //     this.props.handleClick(task);
  //     this.state.inputValue = "";
  //   }
  //   this.props.history.push("/tasks");
  // }

  formHandler = (event) => {
    event.preventDefault();
		this.setState({
			task: {
				...this.state.task,
				[event.target.name]: event.target.value
			}
		});
	};


  addNewTask = (event) => {
		event.preventDefault();
		const { name } = this.state.task;
		if (name.length <= 0) {}

		 else {
			axios
				.post('https://plan-my-dayapp.herokuapp.com/tasks', this.state.task)
				.then((res) => {
					this.setState({
						tasks: res.data.tasks,
						task: { name: ''}
					});
				})
				.catch((err) => console.log(err));
		}
	};

  render() {

    return (
      <div style={{ marginLeft: "45%", width: "60%" }}>
        <form action="">
          <Paper style={{ width: "60%", leftMargin: "0px" }} zDepth={1}>
            <div style={{ marginLeft: "20px", width: "92%" }}>
              <TextField
                hintText="Add a Task"
                className="AddText"
                fullWidth={true}
                onChange={event => this.setState({ inputValue: event.target.value })}
              />
            </div>
          </Paper>
          <br />
          <Button
            style={{ width: "60%" }}
            type="Submit"
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