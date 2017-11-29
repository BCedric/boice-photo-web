import React from 'react'
import { connect } from 'react-redux'
import { map, upperFirst } from 'lodash'
import { Navbar } from 'react-materialize'
import {
  galleriesSelector,
} from 'nav-redux/selectors'

import NavItemComp from './NavItemComp'

const items = [
  {
    nameItem: 'Accueil',
    route: '/'
  },
  {
    nameItem: 'Vrac',
    route: '/vrac'
  }
]

const NavBarComp = connect (
  state => ({
    galleries: galleriesSelector(state)
  }),
  dispatch => ({

  })
)(
  class extends React.Component {
    getNavItem = item => {
        return (
          <NavItemComp
            className={this.props.location.pathname === item.route ? 'active' : ''}
            {...item}
          />
        )
    }

    render () {
      const {galleriesLists, galleriesNotInLists } = this.props
      return (
        <Navbar className='navbar' left>
          { map(items, item => this.getNavItem(item)) }
          {
            galleriesLists
              && map(galleriesLists,
                list => this.getNavItem({nameItem: upperFirst(list.name), route: '/gallerieslist/'+list.id}))
          }

            {
              galleriesNotInLists
                && map(galleriesNotInLists, gallery => this.getNavItem({nameItem: upperFirst(gallery.name), route: '/gallery/'+gallery.id}))
            }
            {map([{
                nameItem: 'Contact',
                route:'/contact'
              }], item => this.getNavItem(item))}
        </Navbar>
      )
    }
  }
)

export default NavBarComp
