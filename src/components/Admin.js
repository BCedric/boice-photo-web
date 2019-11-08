import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import {
  Button,
  Row,
  Input,
} from 'react-materialize'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react'

import {
  messageSelector,
  adressServerSelector
} from 'admin-redux/selectors'
import {
  updateDB,
  saveAdressServer
} from 'admin-redux/actions.js'
import AdminGalleries from './admin-components/AdminGalleries'
import './styles/Admin.css'

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
    constructor() {
      super()
      this.state = { adressServer: '', value: 0 }
    }

    handleChange = (event, value) => {
      this.setState({ value })
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
            {/* <Tab title="Photos">
              Photos
            </Tab> */}
            <Tab label="Galeries">
            </Tab>
            <Tab label="tests">

            </Tab>
          </Tabs>

          <TabPanel value={value} index={0}>
            <AdminGalleries></AdminGalleries>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <form onSubmit={e => {
              e.preventDefault()
            }}>
              <Row>
                <Input s={6} label="Adress Server" validate onChange={e => {
                  this.props.saveAdressServer(e.target.value)
                }} value={this.props.adressServer} />
                <Button>Save</Button>
              </Row>
            </form>
            <Button onClick={() => this.props.updateDB(this.props.adressServer)}>Update DB</Button>
            {this.props.message && <p>{this.props.message}</p>}
          </TabPanel>

        </div>
      )
    }
  }
)

export default Admin
