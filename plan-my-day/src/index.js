<<<<<<< HEAD
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
=======
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

>>>>>>> a4d2aa1135f83644bc548d86f67e5bd198a1a290
