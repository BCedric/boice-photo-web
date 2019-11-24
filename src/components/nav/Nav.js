import React from 'react'
import { upperFirst } from 'lodash'
import { connect } from 'react-redux'
import { AppBar, Toolbar } from '@material-ui/core'
import {
  Link
} from 'react-router-dom'

import {
  fetchNavGalleries,
} from 'redux/nav-redux/actions'
import {
  navGalleriesSelector
} from 'redux/nav-redux/selectors'
import { withRouter } from 'react-router'

import logo from '../styles/img/logo.png'
import NavItemComp from './nav-components/NavItemComp'

import './Nav.css'

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
        <div className='header'>
          <Link to='/'>
            <img className='logo' src={logo} alt='logo' />
          </Link>
        </div>
        <AppBar className='navbar' position="static">
          <Toolbar>
            {items.map((item, index) => this.getNavItem(item, index))}
            {navGalleries != null && this.mapGalleries(navGalleries.galleriesLists, 'gallerieslist')}
            {navGalleries != null && this.mapGalleries(navGalleries.galleries, 'gallery')}
            {/* <NavBarGalleries {...this.props} className='fade' /> */}
          </Toolbar>
        </AppBar>
      </div >
    )
  }
})


export default withRouter(Nav)
