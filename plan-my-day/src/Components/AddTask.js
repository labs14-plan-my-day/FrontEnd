import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class AddTask extends Component {
	
	static propTypes = { 
	 		handleClick: PropTypes.func,
	}

	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
		this.state = {
			inputValue: '',
		}
	}

	onClick(event) {
		event.preventDefault();
		var task = this.state.inputValue;
		if(task=='') return 
		else {
			var form = document.getElementById("addTask");
			form.reset()
			this.props.handleClick(task);
			this.state.inputValue = ''
		}
	}

	render() {
		 const {
      handleClick, 
    } = this.props;
		return(
			<MuiThemeProvider>
				<div style={{marginLeft: '30%', width: '60%'}}>
					<form id="addTask">
					<Paper style={{width: '60%', leftMargin: '0px'}} zDepth={1}>
					<div 
						style={{marginLeft: '20px', width: '92%'}}
					>
						<TextField 
							hintText="Add a Task"
							className="AddText" 
							fullWidth={true}
							onChange={(e) => this.setState({ inputValue: e.target.value })}
						>
						</TextField>
					</div>
					</Paper>
						<br/>
						<RaisedButton 
						style={{width: '60%'}}
							type="submit" 
							label='Add Task' 
							
							primary={true}  
							onClick={this.onClick} 
						/>
					</form>
					
				</div>
			</MuiThemeProvider>
		)
	}
}

export default AddTask;