import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from "redux";
import './index.css';
import galleriesListReducer from 'redux/galleries-list-redux/reducer'
import galleryReducer from 'redux/gallery-redux/reducer'
import adminReducer from 'redux/admin-redux/reducer'
import navReducer from 'redux/nav-redux/reducer'
import contactReducer from 'redux/contact-redux/reducer'
import loginRedcer from 'redux/login-redux/reducer';
import homeReducer from 'redux/home-redux/reducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(combineReducers({
  galleriesListState: galleriesListReducer,
  galleryState: galleryReducer,
  navState: navReducer,
  adminState: adminReducer,
  contactState: contactReducer,
  loginState: loginRedcer,
  homeState: homeReducer
}))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
