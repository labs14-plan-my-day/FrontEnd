<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import Provider
import { Provider } from 'react-redux';
//import store
import { createStore, applyMiddleware } from 'redux';
//import reducer
import { rootReducer } from './reducers';
//import thunk and logger
import thunk from 'redux-thunk';
import logger  from 'redux-logger';
//import Route 
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(rootReducer, 
              applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
=======
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

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
    <App />
  </Auth0Provider>,
  document.getElementById("root")
>>>>>>> 83b24deb10a4dd8c789cf238fbc910459aa614d1
);

