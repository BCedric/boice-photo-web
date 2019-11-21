import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';

import Home from './components/home/Accueil'
import Gallery from './components/gallery/Gallery'
import GalleriesList from './components/galleries-list/GalleriesList'
import Contact from './components/contact/Contact'
import Nav from './components/nav/Nav'
import theme from 'styles/theme';

import './App.css';
import BootLogin from './components/login/BootLogin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ThemeProvider theme={theme}>
              <Nav></Nav>
              <div className='content'>
                <Route exact path='/' component={Home} />
                <Route path='/vrac' component={Gallery} />
                <Route path='/gallery/:galleryId' component={Gallery} />
                <Route path='/gallerieslist/:galleriesList' component={GalleriesList} />
                <Route path='/contact' component={Contact} />
                <Route path='/admin' component={BootLogin} />
              </div>
            </ThemeProvider>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
