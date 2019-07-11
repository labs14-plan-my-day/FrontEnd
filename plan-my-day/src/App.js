import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component() {
  constructor(){
    super(props);
    this.state={
      response: []
    }
  }

  componentDidMount() {
    console.log('mounted');
    axios.get('https://plan-my-dayapp.herokuapp.com/dummy')
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
  return (
      <div className="App">
       
      </div>
      );
    }
  }

export default App;
