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
      padding: '0 2em',
      color: white,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      fontSize: '15px',
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

const PortfolioMenuItem = connect()(
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

export default withTheme(PortfolioMenuItem)
