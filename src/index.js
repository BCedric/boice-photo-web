import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {combineReducers, createStore} from "redux";
import './index.css';
import galleriesListReducer from 'galleries-list-redux/reducer'
import galleryReducer from 'gallery-redux/reducer'
import adminReducer from 'admin-redux/reducer'
import navReducer from 'nav-redux/reducer'
import contactReducer from 'contact-redux/reducer'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(combineReducers({
  galleriesListState : galleriesListReducer,
  galleryState: galleryReducer,
  navState: navReducer,
  adminState: adminReducer,
  contactState: contactReducer
}))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
