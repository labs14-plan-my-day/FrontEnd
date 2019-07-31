import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

// import PrivateRoute from "./components/PrivateRoute";
// import Loading from "./components/Loading";
// import NavBar from "./components/NavBar";
// import Home from "./views/Home";
// import Profile from "./views/Profile";
// import { useAuth0 } from "./react-auth0-spa";

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
