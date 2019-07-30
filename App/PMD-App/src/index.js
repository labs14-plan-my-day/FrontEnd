import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { render } from 'react-dom';

import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
