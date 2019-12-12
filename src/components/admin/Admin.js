import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Button, Tabs, Tab } from "@material-ui/core"

import {
  messageSelector,
} from 'redux/admin-redux/admin-message-redux/selectors'
import {
  uploadSizeValueSelector,
  progressUploadValueSelector
} from 'redux/admin-redux/admin-progress-upload/selectors'
import {
  updateDB,
} from 'redux/admin-redux/actions.js'
import { logout, refreshToken } from 'redux/login-redux/actions'

import AdminGalleries from './admin-components/admin-galleries-tab/AdminGalleries'
import AdminGalleriesLists from './admin-components/admin-galleries-lists-tab/AdminGalleriesLists'
import ProgressBar from 'components/ProgressBar'

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
      uploadSizeValue: uploadSizeValueSelector(state),
      progressUploadValue: progressUploadValueSelector(state)
    }
  },
  dispatch => {
    return {
      updateDB: () => updateDB()(dispatch),
      logout: (user) => logout(user)(dispatch),
      refreshToken: () => refreshToken()(dispatch)
    }
  }
)(
  function ({ logout, message, updateDB, uploadSizeValue, progressUploadValue, refreshToken }) {
    const [value, setValue] = useState(0)
    const handleChange = (event, value) => {
      setValue(value)
    }

    useEffect(() => {
      const intervalId = setInterval(refreshToken, 60 * 1000 * 15)
      return () => clearInterval(intervalId)
    })

    const onClickLogout = () => {
      const userLogged = JSON.parse(sessionStorage.getItem('userLogged'))
      logout(userLogged)
    }

    return (
      <div className="admin">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | Admin </title>
        </Helmet>
        <ProgressBar value={progressUploadValue} completeValue={uploadSizeValue} />

        <Tabs
          value={value}
          onChange={handleChange}
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
          <Button onClick={() => updateDB()}>Update DB</Button>
          {message && <p>{message}</p>}
        </TabPanel>
        <Button color="primary" onClick={() => onClickLogout()}>Déconnexion</Button>

      </div>
    )
  }
)

export default Admin
