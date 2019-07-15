import React, { Component } from 'react';

import { connect } from 'react-redux';      
import { login } from '../actions';  
//MATERIAL 
import { Button, TextField } from '@material-ui/core';

class Login extends Component {
    state={
        credentials: {
            username: '',
            password: ''
        }
    }

    login = (event) => {
        event.preventDefault()
        this.props.login(this.state.credentials).then(() => {
            // this.props.history.push('/protected');
            alert('works');
        })
    }

    handleChanges = (event) => {
        event.preventDefault();
        this.setState({
            credentials: {
                ...this.state.credentials, 
                [event.target.name] : event.target.value,
            }
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.login}>
                    <TextField 
                        onChange={this.handleChanges}
                        className="email"
                        name="username"
                        value={this.state.username}
                        placeholder='email...'
                        required
                    >
                    </TextField>
                    <TextField
                        onChange={this.handleChanges}
                        className="password"
                        name="password"
                        value={this.state.password}
                        placeholder="enter password..."
                        required
                    >
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" value="submit" >Submit</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        loggedIn: true,//state.loggedIn,
    }
}

export default connect(mapStateToProps, { login })(Login);