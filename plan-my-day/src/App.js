import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component() {
  constructor(){
    super();
    this.state={
      response: []
    }
  }

  componentDidMount() {
    console.log('mounted');
    axios.get('https://plan-my-dayapp.herokuapp.com/dummy')
    .then((res) => {
      this.state.response.push(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
  return (
      <div className="App">
        <h1>Slack - Plan my day</h1>
      </div>
      );
    }
  }

export default App;
