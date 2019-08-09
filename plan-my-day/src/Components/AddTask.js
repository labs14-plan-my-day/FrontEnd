import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {

      task: {
         name:"",
         description:"",
         importance: 0
     }
    };
  }

  formHandler = (event) => {
    event.preventDefault();


		this.setState({
			task: {
				...this.state.task,
        [event.target.name]: event.target.value,
        [event.target.description]: event.target.value,
        [event.target.importance]: event.target.value       
    
			}
		});
  };
  

  addNewTask = (event) => {
    event.preventDefault();
    const newTask = { user_id: 1,
       name: this.state.task.name,
        description: this.state.task.description,
        importance: this.state.task.importance,
         date: Date.now(),
          start_time: "12:00", end_time: "1:00" }
    const  name  = this.state.task.name;
		if (name.length <= 0) {}

		 else {
			axios
				.post('https://plan-my-dayapp.herokuapp.com/tasks', newTask)
				.then((res) => {
          this.props.refetchAllTasks();
					this.setState({
            name: "",
            description: "",
            importance: 0

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
                // value={this.state.name}
              />
              
              <TextField
              placeholder="Description"
                onChange={this.formHandler}
                hintText="Add a Description"
                name="description"
                className="AddText"
                fullWidth={true}
                // value={this.state.task.description}
              
              />
              Select Priority
              <FormControl >
        <InputLabel></InputLabel>
        <Select
        placeholder="Priority"
        fullWidth={true}
        name="importance"
        onChange={this.formHandler} 
        // value={this.state.importance}
        >
          
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </Select>
      </FormControl>
              
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