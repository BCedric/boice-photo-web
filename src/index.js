import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {combineReducers, createStore} from "redux";
import './index.css';
import galleryReducer from 'gallery-redux/reducer'
import navReducer from 'nav-redux/reducer'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(combineReducers({
  galleryState: galleryReducer,
  navState: navReducer
}))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
