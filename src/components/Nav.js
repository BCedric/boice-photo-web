import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'

import Accueil from './Accueil'
import Gallery from './Gallery'
import UploadImage from './UploadImage'

export default function Nav (props) {
  return (
    <div>
        <Router>
          <div>
            <Navbar brand='logo' left>
              <NavItem><Link to='/'>Accueil</Link></NavItem>
              <NavItem><Link to='/gallery'>Gallerie</Link></NavItem>
              <NavItem><Link to='/uploadimage'>UploadImage</Link></NavItem>
              <NavItem><Link to='/gallery/1'>Gallerie 1</Link></NavItem>
              <NavItem><Link to='/gallery/3'>Gallerie 3</Link></NavItem>
            </Navbar>
            <Route exact path='/' component={Accueil} />
            <Route path='/uploadimage' component={UploadImage} />
            <Route exact path='/gallery' component={Gallery} />
            <Route path='/gallery/:galleryId' component={Gallery}  />
          </div>
        </Router>
    </div>
  )
}
