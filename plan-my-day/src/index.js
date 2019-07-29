import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "./index.css";

const AppWithRouter = withRouter(Main);

ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  document.getElementById("root")
);
