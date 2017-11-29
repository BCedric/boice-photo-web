import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import {
  Button,
  Row,
  Input
} from 'react-materialize'
import React from 'react'

import {
  messageSelector,
  adressServerSelector
} from 'admin-redux/selectors'
import {
  updateDB,
  saveAdressServer
} from 'admin-redux/actions.js'

const Admin = connect(
  state => {
    return {
      message: messageSelector(state),
      adressServer: adressServerSelector(state)
    }
  },
  dispatch => {
    return {
      updateDB: adressServer => updateDB(adressServer)(dispatch),
      saveAdressServer: adress => dispatch(saveAdressServer(adress))
    }
  }
)(
  class extends React.Component {
    constructor () {
      super()
      this.state = { adressServer: '' }
    }


    render () {
      return (
        <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | Admin </title>
        </Helmet>
          <form onSubmit={e => {
            e.preventDefault()
          }}>
            <Row>
            	<Input s={6} label="Adress Server" validate onChange={e =>{
                this.props.saveAdressServer(e.target.value)
              } } value={this.props.adressServer} />
              <Button>Save</Button>
            </Row>
          </form>
          <Button onClick={() => this.props.updateDB(this.props.adressServer)}>Update DB</Button>
          {this.props.message && <p>{this.props.message}</p>}

        </div>
      )
    }
  }
)

export default Admin
