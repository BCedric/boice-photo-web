import React from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import { map } from 'lodash'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'

import Accueil from './Accueil'
import Gallery from './Gallery'
import UploadImage from './UploadImage'
import { fetchGalleries } from 'nav-redux/actions'
import { galleriesSelector } from 'nav-redux/selectors'

const Nav = connect(
  state => {
    return {
      galleries: galleriesSelector(state)
    }
  },
  dispatch => ({
      fetchGalleries: () => fetchGalleries()(dispatch),
  })
)(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    props.fetchGalleries()
  }

  componentDidMount(){
    this.props.fetchGalleries()
  }

  render () {
    return (
      <div>
          <Router>
            <div>
              <Navbar brand='logo' left>
                <NavItem><Link to='/'>Accueil</Link></NavItem>
                <NavItem><Link to='/gallery'>Gallerie</Link></NavItem>
                <NavItem><Link to='/uploadimage'>UploadImage</Link></NavItem>
                {this.props.galleries !== undefined
                  ? map(this.props.galleries.toJS(), gallerie => <NavItem><Link to={`/gallery/${gallerie.id}`}>{gallerie.name}</Link></NavItem>)
                  : null
                }
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
})

export default Nav
