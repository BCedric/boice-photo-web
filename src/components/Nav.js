import React from 'react'
import PropTypes from 'prop-types'
import { upperFirst } from 'lodash'
import { Navbar } from 'react-materialize'
import { connect } from 'react-redux'
import {
  fetchNavGalleries,
} from 'nav-redux/actions'
import {
  navGalleriesSelector
} from 'nav-redux/selectors'
import { withRouter } from 'react-router'

import logo from './styles/img/logo.png'
import NavBarGalleries from './nav-components/NavBarGalleries'
import NavItemComp from './nav-components/NavItemComp'

import './styles/Nav.css'

const items = [
  {
    nameItem: 'Accueil',
    route: '/'
  },
  {
    nameItem: 'Vrac',
    route: '/vrac'
  },
  {
    nameItem: 'Contact',
    route: '/contact'
  }
]

const Nav = connect(
  state => {
    return {
      navGalleries: navGalleriesSelector(state)
    }
  },
  dispatch => ({
    fetchNavGalleries: () => fetchNavGalleries()(dispatch)
  })
)(class extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchNavGalleries()
  }


  getNavItem = (item, index) => {
    return (
      <NavItemComp
        className={this.props.location.pathname === item.route ? 'active' : ''}
        key={index}
        {...item}
      />
    )
  }

  mapGalleries = (galleriesLists, baseRoute) => {
    return galleriesLists.map(
      (list, index) => this.getNavItem({
        nameItem: upperFirst(list.name),
        route: `/${baseRoute}/${list.id}`
      }, index))
  }

  render() {
    const { navGalleries } = this.props
    return (
      <div className='nav'>
        <div>
          <div className='header'>
            <img className='logo' src={logo} alt='logo' />
          </div>
          <Navbar className='navbar' left>
            {items.map((item, index) => this.getNavItem(item, index))}
            {navGalleries != null && this.mapGalleries(navGalleries.galleriesLists, 'gallerieslist')}
            {navGalleries != null && this.mapGalleries(navGalleries.galleries, 'gallery')}
            {/* <NavBarGalleries {...this.props} className='fade' /> */}
          </Navbar>
        </div>
      </div>
    )
  }
})


export default withRouter(Nav)
