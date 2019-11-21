import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Button, Tabs, Tab } from "@material-ui/core"

import {
  messageSelector,
  adressServerSelector
} from 'redux/admin-redux/selectors'
import {
  updateDB,
  saveAdressServer
} from 'redux/admin-redux/actions.js'
import AdminGalleries from './admin-components/admin-galleries-tab/AdminGalleries'
import './Admin.css'
import AdminGalleriesLists from './admin-components/admin-galleries-lists-tab/AdminGalleriesLists'
import { logout } from 'redux/login-redux/actions'

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      hidden={value !== index}
    >
      {children}
    </div>
  );
}

const Admin = connect(
  state => {
    return {
      message: messageSelector(state),
      adressServer: adressServerSelector(state),
    }
  },
  dispatch => {
    return {
      updateDB: adressServer => updateDB(adressServer)(dispatch),
      saveAdressServer: adress => dispatch(saveAdressServer(adress)),
      logout: (user) => logout(user)(dispatch)
    }
  }
)(
  class extends React.Component {
    constructor() {
      super()
      this.state = { adressServer: '', value: 0 }
    }

    handleChange = (event, value) => {
      this.setState({ value })
    }

    logout = () => {
      const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))
      this.props.logout(userLogged)
    }


    render() {
      const { value } = this.state
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Boïce Photo | Admin </title>
          </Helmet>

          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Galeries" />
            <Tab label="Listes" />
            <Tab label="tests" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <AdminGalleries></AdminGalleries>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminGalleriesLists></AdminGalleriesLists>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Button onClick={() => this.props.updateDB(this.props.adressServer)}>Update DB</Button>
            {this.props.message && <p>{this.props.message}</p>}
          </TabPanel>
          <Button color="primary" onClick={() => this.logout()}>Déconnexion</Button>

        </div>
      )
    }
  }
)

export default Admin
