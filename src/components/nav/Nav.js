import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'

import {
  fetchNavGalleries,
} from 'redux/nav-redux/actions'
import {
  navGalleriesSelector
} from 'redux/nav-redux/selectors'
import { useRouteMatch } from "react-router";

import logo from '../styles/img/logo.png'

import { withStyles } from '@material-ui/styles'
import NavItemComp from './nav-components/NavItemComp'

const items = [
  {
    nameItem: 'Accueil',
    route: '/'
  },
  {
    nameItem: 'Photos',
    route: '/portfolio'
  },
  {
    nameItem: 'Contact',
    route: '/contact'
  }
]

const styles = ({ palette }) => ({
  logo: {
    margin: '10px',
    width: '150px',
    textDecoration: 'none'
  },
  menu: {
    width: '250px',
    backgroundColor: palette.primary.main,
    flexShrink: '0',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
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
)(function Nav({ fetchNavGalleries, classes }) {

  useEffect(() => {
    fetchNavGalleries()
  }, [fetchNavGalleries])

  const matches = [
    useRouteMatch({
      path: '/',
      exact: true,
    }),
    useRouteMatch({
      path: '/portfolio'
    }),
    useRouteMatch({
      path: '/contact'
    })
  ]



  const getNavItem = (item, index) => {
    const isActive = matches.some(match => match != null && match.url === item.route)
    return (
      <NavItemComp
        className={isActive ? 'active' : ''}
        key={index}
        {...item}
      />
    )
  }

  return (
    <div
      className={classes.menu}
    >
      <Link to='/' className="unselectable">
        <img className={`${classes.logo} unselectable`} src={logo} alt='logo' />
      </Link>
      {items.map((item, index) => getNavItem(item, index))}
    </div>
  )
})


export default withStyles(styles)(Nav)
