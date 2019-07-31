import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: []
    };
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
