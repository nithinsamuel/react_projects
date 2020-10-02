import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import './index.css';
// for testing the email we make post request to the backend manually
//when we use oauth testing in postman is tedious so we manually test it as we pass all cookies from the client side
import axios from 'axios';
// assign axios to window.axios
window.axios=axios;

// -first argument to createStore is all the reducers for our app
// -second argument is the initial state of our application
// -third argument is the applymiddleware call
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// console.log("STRIPE KEY IS", process.env.REACT_APP_STRIPE_KEY);
// console.log("ENVIRONMENT IS", process.env.NODE_ENV);
serviceWorker.unregister();