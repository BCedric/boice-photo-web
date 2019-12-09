import React from 'react'
import {
  Link
} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import { useRouteMatch } from "react-router";

import logo from '../styles/img/logo.png'

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

const useStyles = makeStyles(({ palette }) => ({
  logo: {
    margin: '10px',
    height: '150px',
    textDecoration: 'none'
  },
  menu: {
    position: 'fixed',
    width: '250px',
    backgroundColor: palette.primary.main,
    flexShrink: '0',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
}))

function Nav() {
  const classes = useStyles()

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
}


export default Nav
