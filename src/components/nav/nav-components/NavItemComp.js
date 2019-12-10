import React from 'react'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { withTheme, makeStyles } from '@material-ui/styles'
import { white } from 'material-ui/styles/colors'


const useStyles = makeStyles(theme => {
  return {
    'link': {
      fontFamily: 'BiGPoiNts',
      display: 'flex',
      justifyContent: 'center',
      padding: '0.2em',
      color: white,
      alignItems: 'center',
      textDecoration: 'none',
      transition: 'border-color 0.5s',
      fontSize: '4em',
      '&:hover::before, &:hover::after': {
        width: '100%',
        height: '100%'
      },

    },
    'active': {

      '& span': {
        '&::after': {
          transform: 'scale3d(1, 1, 1)',
          transition: 'transform 0.3s ease-out'
        }
      }
    }
  }
});

const NavItemComp = connect()(
  function (props) {
    const classes = useStyles()
    const activeClass = () => props.className === 'active' && classes.active

    return (
      <Link className={` ${activeClass()} ${classes.link} unselectable`} to={props.route} >
        <span className="progressive-underline" >
          {props.nameItem}
        </span>
      </Link >
    )
  }
)

export default withTheme(NavItemComp)
