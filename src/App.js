import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Accueil from './components/Accueil'
import Admin from './components/Admin'
import Gallery from './components/Gallery'
import GalleriesList from './components/GalleriesList'
import UploadImage from './components/UploadImage'

import Nav from './components/Nav'
import './App.css';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Router>
          <div>
            <Nav></Nav>
            <div className='content'>
              <Route exact path='/' component={Accueil} />
              <Route path='/uploadimage' component={UploadImage} />
              <Route path='/admin' component={Admin} />
              <Route exact path='/gallery' component={Gallery} />
              <Route path='/gallery/:galleryId' component={Gallery}  />
              <Route path='/gallerieslist/:galleriesList' component={GalleriesList}  />
            </div>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
