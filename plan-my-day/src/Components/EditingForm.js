import React, {Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios';

const whatTask = {
	name: ''
};
class EditingForm extends Component {

    constructor(props) {
            super(props);
            this.state = {
                tasks: [ {} ],
                task: { name: '' },
                editingId: null,
                activeTask: null,
                isEditing: false
            };
        }

    formHandler = (event) => {
		this.setState({
			task: {
				...this.state.task,
				[event.target.name]: event.target.value
			}
		});
	};

  setUpUpdateForm = (event, task) => {
		event.preventDefault();
		this.setState({
			task: this.state.task,
			isEditing: true
		});
	};

    updateInfo = (event) => {
    event.preventDefault();
    const editTask = { user_id: 1, id:this.props.id, name: this.state.task.name, date: Date.now(), start_time: "12:00", end_time: "1:00" }
    const  name  = this.state.task.name;
    axios
			.put(`https://plan-my-dayapp.herokuapp.com/tasks/${this.props.id}`, editTask)
			.then((res) => {
        console.log(this.state.name)
        this.props.handleToggle();
        this.props.refetchAllTasks();
				this.setState({
					tasks: res.data.tasks,
					task: { name: '', task: whatTask, isEditing: false }
				});
			})
			.catch((err) => console.log(err));
	};

  render() {
    const open  = this.props.open;
    console.log(this.state.task);
    return(
      <Fragment>
          
        <Dialog
          open={open}
          onClose={this.props.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              onChange={this.formHandler}
                name="name"
                hintText="Add a Task"
                className="AddText"
                fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleToggle} color="primary">
              Cancel
            </Button>
            <Button  
            type="submit"
            label="Add Task"
            primary={true} 
            onClick={this.updateInfo} 
            color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>  
    )
  }
}

export default EditingForm;