import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import Home from './components/home/Home'
import Gallery from './components/gallery/Gallery'
import GalleriesList from './components/galleries-list/GalleriesList'
import Contact from './components/contact/Contact'
import Nav from './components/nav/Nav'
import theme from 'styles/theme';
import BootLogin from './components/login/BootLogin';

import 'styles/styles.scss'

const useStyles = makeStyles({
  appContent: {
    margin: '0 auto',
    flexGrow: '1'
  }
})

function App() {
  const classes = useStyles()
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Nav></Nav>
          <div className={classes.appContent}>
            <Route exact path='/' component={Home} />
            <Route path='/vrac' component={Gallery} />
            <Route path='/gallery/:galleryId' component={Gallery} />
            <Route path='/gallerieslist/:galleriesList' component={GalleriesList} />
            <Route path='/contact' component={Contact} />
            <Route path='/admin' component={BootLogin} />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
