import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';

import App from './App';
import initializeStore from './store/store';
import initializeFirebase from './firebase';

import * as serviceWorker from './serviceWorker';

initializeFirebase();

const store = initializeStore();

const app = (
  <Provider store = {store}>
    <App />
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
