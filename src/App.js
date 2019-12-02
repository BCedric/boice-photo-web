import React from 'react';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import Home from './components/home/Home'
import Contact from './components/contact/Contact'
import Nav from './components/nav/Nav'
import theme from 'styles/theme';
import BootLogin from './components/login/BootLogin';
import Portfolio from './components/portfolio/Portfolio';

import 'styles/styles.scss'

const useStyles = makeStyles({
  appContent: {
    flexGrow: '1',
    minWidth: '500px',
    marginLeft: '250px',
  }
})

function App() {
  const classes = useStyles()
  return (
    <Router basename="/">
      <ThemeProvider theme={theme}>
        <div className="App">
          <Nav></Nav>
          <div className={classes.appContent}>
            <Route exact path='/' component={Home} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/contact' component={Contact} />
            <Route path='/admin' component={BootLogin} />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
