import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

const whatTask = {
  name: "",
  description: ""
};



class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserID: localStorage.getItem("currentUser"),
      comment: '',
      comments: [],
      taskId: this.props.task.id,
      editingId: null,
      activeTask: null,
      isEditing: false
    };
  }

  componentWillMount() {
    this.refetchComments()
  }

  refetchComments = () => {
      const endpoint = `https://plan-my-dayapp.herokuapp.com/comments`
      console.log(endpoint)
      axios
        .get(endpoint)
        .then(res => {
          this.setState({
            comments: res.data.comments
          })
        })
        .catch(err => console.log(err))
  }


  addComment = e => {
    console.log(this.state.taskId)
    e.preventDefault();
    const commentObj = {
      task_id: this.state.taskId,
      commentor: this.state.currentUserID,
      comment: this.state.comment
    }
    console.log(commentObj)
    axios
      .post(
        `https://plan-my-dayapp.herokuapp.com/comments/`,
        commentObj
      )
      .then(res => {
        this.props.handleToggle2()
        this.refetchComments()
      })
      .catch(err => console.log(err))
  }

  formHandler = event => {
    this.setState({
      comment: event.target.value
    });
  };

  setUpUpdateForm = (event, task) => {
    event.preventDefault();
    this.setState({
      task: this.state.task,
      isEditing: true
    });
  };

  render() {
    const open = this.props.open2;
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={this.props.handleToggle2}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Comment Section</DialogTitle>
          <DialogContent>
            <div>

              {this.state.comments.map((comment) => {
                return (<p>{comment.comment} - {comment.commentor}</p>)
              })}
            </div>
            <TextField
              placeholder="Comment"
              onChange={this.formHandler}
              name="comment"
              hintText="Add a Comment"
              className="AddText"
              fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleToggle2} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              label="Add Task"
              primary={true}
              onClick={this.addComment}
              color="primary"
            >
              Comment
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default CommentSection;
