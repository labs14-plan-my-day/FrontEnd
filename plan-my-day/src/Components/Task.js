import React, { Component, PropTypes } from 'react';
import {
	blueGrey800,
 	red600,
} from 'material-ui/styles/colors';
import Checkbox from 'material-ui/Checkbox'
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';

const listElementStyles = {
	fontSize: 26,
	lineHeight: '26px',
}

const listElementCheckedStyles = {
	...listElementStyles,
	textDecoration: 'line-through',
}

class Task extends Component{
	static propTypes = { 
			task: PropTypes.string,
	 };


	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	onClick(event) {
		this.props.handleRemove(this.props.id)
	}

	onCheck(event) {
		console.log(this.props.id)
		this.props.handleCheck(this.props.id)
	}

	render() {
		 const {
      task,
    } = this.props;

		const listStyles = !this.props.checked ? listElementStyles: listElementCheckedStyles;
		return(
			<ListItem style={{width: '90%'}} rightIconButton={<div style={{display: 'flex'}}>
						 										<IconButton tooltip='remove' tooltipPosition='bottom-right' onClick={this.onClick} iconStyle={{color: red600}}>
						 											<DeleteIcon/>
						 										</IconButton><Checkbox onCheck={this.onCheck}style={{marginTop:12}}/>
						 									</div>}>
			<div style={{display: 'flex'}}>
				<li style={listStyles}>
					{task}
				</li>
			</div>
			<Divider />
		</ListItem>
		)
	}
} 


export default Task;