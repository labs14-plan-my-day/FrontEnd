import React, { Component } from 'react';
import logo from './logo.svg';
import axios from Axios;
import './App.css';
import Axios from 'axios';

class App extends Component() {
  constructor(){
    super();
    this.state={
      response: []
    }
  }

  componentDidMount() {
    axios.get('')
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      );
    }
  }

export default App;
