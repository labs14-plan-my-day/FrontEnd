import React from 'react';

class EditingForm extends React.Component {
    render(){

        return (

            <form>
                <input name="name" value={this.props.taskBeingEdited.name}/>
            </form>
        )
    }
}

export default EditingForm