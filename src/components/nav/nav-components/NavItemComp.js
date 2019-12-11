import React from 'react'
import { connect } from 'react-redux'
import MyLink from 'components/MyLink'

const NavItemComp = connect()(
  function (props) {
    const activeClass = () => props.className === 'active' && 'nav-item-active'

    return (
      <MyLink className={` ${activeClass()} nav-item unselectable centered-h-v`} to={props.route} >
        <span className="progressive-underline" >
          {props.nameItem}
        </span>
      </MyLink >
    )
  }
)

export default NavItemComp
