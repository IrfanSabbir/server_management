import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import authReducer from './store/reducers/auth'
import serverReducer from './store/reducers/server'

import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducer = combineReducers({
  auth:authReducer,
  server:serverReducer
})

// process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose
const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: null || compose


const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

