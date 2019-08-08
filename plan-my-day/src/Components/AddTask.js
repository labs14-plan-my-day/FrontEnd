import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {

      task: {
         name:"",
         description:"",
     }
    };
  }

  formHandler = (event) => {
    event.preventDefault();


		this.setState({
			task: {
				...this.state.task,
        [event.target.name]: event.target.value,
        [event.target.description]: event.target.value        
    
			}
		});
  };
  

  addNewTask = (event) => {
    event.preventDefault();
    const newTask = { user_id: 1, name: this.state.task.name, description: this.state.task.description, date: Date.now(), start_time: "12:00", end_time: "1:00" }
    const  name  = this.state.task.name;
		if (name.length <= 0) {}

		 else {
			axios
				.post('https://plan-my-dayapp.herokuapp.com/tasks', newTask)
				.then((res) => {
          this.props.refetchAllTasks();
					this.setState({
            name: "",
            description: "" 
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
              placeholder="Task"
                onChange={this.formHandler}
                name="name"
                hintText="Add a Task"
                className="AddText"
                fullWidth={true}
              
              />
              
              <TextField
              placeholder="Description"
                onChange={this.formHandler}
                hintText="Add a Description"
                name="description"
                className="AddText"
                fullWidth={true}
              
              />
              <TextField
        id="standard-select-currency-native"
        select
        label=""
        // className={ }
        // value={ }
        // onChange={ }
        SelectProps={{
          native: true,
          MenuProps: {
            
          },
        }}
        helperText="Please select priority"
        margin="normal"
      ></TextField>
            </div>
          </Paper>
          <br />
          <Button
            style={{ width: "60%" }}
            type="Submit"
            label="Add Task"
            primary={true}
            onClick={this.addNewTask}
            
          >
            Add Task
          </Button >
        </form>
      </div>
    );
  }
}

export default AddTask;