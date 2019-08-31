import React, { Component, Fragment } from "react";
import axios from "axios";

class Slack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                email:'',
                username:'',
                
                slackID :''

            }
        }
    }

    formHandler = event =>{
        this.setState({
            user: {
                id: localStorage.getItem("currentUserID"),
                email: localStorage.getItem("currentUserEmail"),
                username : localStorage.getItem("currentUser"),
                slackID: event.target.value
            }
        })
    }
    sayhi= ()=>{
        console.log("hello")
        console.log(this.state.user)
    }

    updateUser = e =>{
        e.preventDefault();
        let endpoint = `https://plan-my-dayapp.herokuapp.com/auth/${this.state.user.id}`
        console.log(endpoint)
        axios
        .put(endpoint, this.state.user)
        .then(res=>{
            window.alert(`Your Slack ID is now set to ${this.state.user.slackID}`);
            console.log('worked')
        }).catch(err=> console.log(err))
    }



    render() {
        console.log(this.state.user)
        return (
            <div>
                <h3>How to add slack user info:</h3>
                <img src='https://i.imgur.com/sGjfZyJ.png'></img>
                <input
                    placeholder='your ID here'
                    name='slackID'
                    onChange={this.formHandler}
                >

                </input>
                <button onClick={this.updateUser}>Submit</button>
            </div>
        )
    }
}

export default Slack