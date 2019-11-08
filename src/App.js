import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './components/home/Accueil'
import Admin from './components/admin/Admin'
import Gallery from './components/gallery/Gallery'
import GalleriesList from './components/galleries-list/GalleriesList'
import UploadImage from './components/UploadImage'
import Contact from './components/contact/Contact'

import Nav from './components/nav/Nav'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav></Nav>
            <div className='content'>
              <Route exact path='/' component={Home} />
              <Route path='/uploadimage' component={UploadImage} />
              <Route path='/vrac' component={Gallery} />
              <Route path='/gallery/:galleryId' component={Gallery} />
              <Route path='/gallerieslist/:galleriesList' component={GalleriesList} />
              <Route path='/contact' component={Contact} />
              <Route path='/admin' component={Admin} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
