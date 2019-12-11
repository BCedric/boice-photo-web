import React from 'react'

import MyLink from 'components/MyLink'

function PortfolioMenuItem(props) {
  return (
    <MyLink className={`menu-item ${props.className} centered-v`} to={props.route}>
      <span>{props.nameItem}</span>
    </MyLink>
  )
}

export default PortfolioMenuItem
