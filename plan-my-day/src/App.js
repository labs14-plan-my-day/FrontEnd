import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";


import PrivateRoute from "./Components/PrivateRoute";
import Loading from "./Components/Loading";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

import Home from "./views/Home";
import Main from "./views/Main";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
// NEW - import the ExternalApi component
import ExternalApi from './Components/ExternalApi'

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/tasks" component={Main} />

             {/* NEW - add a route to the ExternalApi component */}
      <PrivateRoute path="/external-api" component={ExternalApi} />
      
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
