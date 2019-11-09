import React from 'react'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { withTheme, makeStyles } from '@material-ui/styles'
import { white } from 'material-ui/styles/colors'

import './NavItemComp.css'

const useStyles = makeStyles(theme => {
  return {
    'link': {
      padding: '1em 2em',
      color: white,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s',
      '&:hover': {
        transition: 'background-color 0.3s',
        backgroundColor: theme.palette.primary.light
      }
    },
    'active': {
      backgroundColor: theme.palette.primary.light
    },
  }
});

const NavItemComp = connect()(
  function (props) {
    const classes = useStyles()
    const activeClass = () => props.className === 'active' && classes.active

    return (
      <Link className={`${classes.link} ${activeClass()}`} to={props.route}>
        {props.nameItem}
      </Link>
    )
  }
)

export default withTheme(NavItemComp)
