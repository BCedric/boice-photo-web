import React from 'react'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { NavItem } from 'react-materialize'

const NavItemComp = connect()(
  class extends React.Component {
    render () {
      return (
        <NavItem className={this.props.className}>
          <Link to={this.props.route}>{this.props.nameItem}</Link>
        </NavItem>
      )
    }
  }
)

export default NavItemComp
