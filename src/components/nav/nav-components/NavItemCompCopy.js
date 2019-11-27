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
      display: 'flex',
      justifyContent: 'center',
      padding: '0.2em',
      margin: '0.2em 2em',
      color: white,
      height: '100%',
      borderRadius: '20px 0',
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: '1px',
      alignItems: 'center',
      textDecoration: 'none',
      transition: 'border-color 0.5s',
      fontSize: '2em',
      '&:hover': {
        transition: 'border-color 0.5s',
        borderColor: 'white',
      }
    },
    'active': {
      border: 'solid white 1px',
    },
  }
});

const NavItemCompCopy = connect()(
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

export default withTheme(NavItemCompCopy)
