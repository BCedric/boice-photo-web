import React from 'react'
import { upperFirst } from 'lodash'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Drawer } from '@material-ui/core'
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
import { withStyles } from '@material-ui/styles'
import { width } from '@material-ui/system'
import NavItemCompCopy from './nav-components/NavItemCompCopy'

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

const styles = ({ palette }) => ({
  logo: {
    margin: '10px',
    width: '200px',
  },
  drawer: {
    flexShrink: 0,
    width: '300px',
  },
  drawerPaper: {
    backgroundColor: palette.primary.main,
    width: '300px',
    display: 'block',
  }
})

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
      // <NavItemComp
      //   className={this.props.location.pathname === item.route ? 'active' : ''}
      //   key={index}
      //   {...item}
      // />
      <NavItemCompCopy
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
    const { navGalleries, classes } = this.props
    return (
      // <div className='nav'>
      //   <div className='header'>
      //     <Link to='/'>
      //       <img className='logo' src={logo} alt='logo' />
      //     </Link>
      //   </div>
      //   <AppBar className='navbar' position="static">
      //     <Toolbar>
      //       {items.map((item, index) => this.getNavItem(item, index))}
      //       {navGalleries != null && this.mapGalleries(navGalleries.galleriesLists, 'gallerieslist')}
      //       {navGalleries != null && this.mapGalleries(navGalleries.galleries, 'gallery')}
      //       {/* <NavBarGalleries {...this.props} className='fade' /> */}
      //     </Toolbar>
      //   </AppBar>
      // </div >
      <div>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Link to='/'>
            <img className={classes.logo} src={logo} alt='logo' />
          </Link>
          {items.map((item, index) => this.getNavItem(item, index))}
          {navGalleries != null && this.mapGalleries(navGalleries.galleriesLists, 'gallerieslist')}
          {navGalleries != null && this.mapGalleries(navGalleries.galleries, 'gallery')}
        </Drawer>
      </div>
    )
  }
})


export default withRouter(withStyles(styles)(Nav))
