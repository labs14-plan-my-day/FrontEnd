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
export default class extends Component {

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

    updateInfo = (event, taskID) => {
		event.preventDefault();
		axios
			.put(`https://plan-my-dayapp.herokuapp.com/tasks/${taskID}`, this.state.task.name)
			.then((res) => {
				this.setState({
					tasks: res.data.tasks,
					task: { name: '', task: whatTask, isEditing: false }
				});
			})
			.catch((err) => console.log(err));
	};

  render() {
    const open  = this.props.open;
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
            type="Submit"
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
