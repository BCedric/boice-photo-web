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
      padding: '0 0.5em',
      lineHeight: '0.5em',
      color: white,
      minHeight: '64px',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      fontFamily: 'Gilberto',
      fontSize: '2em',
      '&:hover': {
        transition: 'background-color 0.3s',
        backgroundColor: theme.palette.primary.light
      }

    },
    'linkLabel': {
      margin: '0.2em 0'
    },
    'active': {
      backgroundColor: theme.palette.primary.light
    },
  }
});

const PortfolioMenuItem = connect()(
  function (props) {
    const classes = useStyles()
    const activeClass = () => props.className === 'active' && classes.active

    return (
      <Link className={`${classes.link} ${activeClass()}`} to={props.route}>
        <span className={classes.linkLabel}>{props.nameItem}</span>
      </Link>
    )
  }
)

export default withTheme(PortfolioMenuItem)
