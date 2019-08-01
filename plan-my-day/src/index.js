// import React from "react";
// import ReactDOM from "react-dom";
// import Main from "./Components/Main";
// import { BrowserRouter as Router, withRouter } from "react-router-dom";
// import "./index.css";

// const AppWithRouter = withRouter(Main);

// ReactDOM.render(
//   <Router>
//     <AppWithRouter />
//   </Router>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "./Components/react-auth0-spa";
import config from "./auth_config.json";

const AppWithRouter = withRouter(Main);

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Router>
      <AppWithRouter />
    </Router>
    ,
    <Main />
  </Auth0Provider>,
  document.getElementById("root")
);
