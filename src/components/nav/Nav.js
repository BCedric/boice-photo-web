import React from 'react'
import { useRouteMatch } from "react-router";

import logo from '../styles/img/logo.png'

import NavItemComp from './nav-components/NavItemComp'
import MyLink from 'components/MyLink';

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

function Nav() {
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
      className="nav"
    >
      <MyLink to='/' className="unselectable">
        <img className="nav-logo unselectable" src={logo} alt='logo' />
      </MyLink>
      {items.map((item, index) => getNavItem(item, index))}
    </div>
  )
}


export default Nav
