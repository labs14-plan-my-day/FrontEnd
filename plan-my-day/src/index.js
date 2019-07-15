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
);

