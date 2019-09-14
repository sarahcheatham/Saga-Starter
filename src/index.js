import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from "./Store/ConfigureStore";

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
