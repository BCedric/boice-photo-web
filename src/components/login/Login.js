import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'

import { login } from 'redux/login-redux/actions'

const Login = connect(
    state => ({}),
    dispatch => ({
        login: credentials => login(credentials)(dispatch)
    })
)(
    function (props) {
        const [login, setLogin] = useState('')
        const [password, setPassword] = useState('')

        const onLoginChange = (event) => {
            setLogin(event.target.value)
        }

        const onPasswordChange = (event) => {
            setPassword(event.target.value)
        }

        const submit = (event) => {
            event.preventDefault()
            props.login({ login, password })
        }

        return (
            <div className="login">
                <h1>Login</h1>
                <form className="login-form" onSubmit={(event) => submit(event)}>
                    <div className="form-line">
                        <TextField
                            label="Login"
                            name="Login"
                            variant="outlined"
                            value={login}
                            onChange={(event) => onLoginChange(event)}
                        />
                    </div>
                    <div className="form-line">
                        <TextField
                            label="Mot de passe"
                            name="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(event) => onPasswordChange(event)}
                        />
                    </div>
                    <Button color="primary" type="submit">Valider</Button>
                </form>
            </div>
        )
    }
)


export default Login