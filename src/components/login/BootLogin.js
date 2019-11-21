import React from 'react'
import { connect } from 'react-redux'
import { userLoggedSelector } from 'redux/login-redux/selectors'

import Login from './Login'
import Admin from '../admin/Admin'
import { checkAuth } from 'redux/login-redux/actions'

const BootLogin = connect(
    state => ({
        userLogged: userLoggedSelector(state)
    }),
    dispatch => ({
        checkAuth: (userLogged) => checkAuth(userLogged)(dispatch)
    })
)(
    class BootLogin extends React.Component {

        componentDidMount() {
            const userLoggedFromSessionStorage = sessionStorage.getItem('userLogged')
            if (userLoggedFromSessionStorage != null) {
                this.props.checkAuth(JSON.parse(userLoggedFromSessionStorage))
            }
        }

        render() {
            const { userLogged } = this.props
            return (
                <div>
                    {userLogged == null && <Login />}
                    {userLogged != null && <Admin />}
                </div>
            )
        }
    }
)

export default BootLogin