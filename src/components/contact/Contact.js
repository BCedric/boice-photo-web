import { connect } from 'react-redux'
import Captcha from 'react-captcha'
import Helmet from 'react-helmet'
import React from 'react'
import Modal from 'components/Modal'

import {
  onChangeForm,
  sendEmail,
  setResponse
} from 'redux/contact-redux/actions'
import {
  formSelector,
  responseSelector
} from 'redux/contact-redux/selectors'
import { TextField, Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '100%'
  },
  multiline: {
    width: '100%',
    height: '10em'
  },
  grid: {
    margin: '0.5em',
    maxWidth: '48%'
  }
})

const Contact = connect(
  state => ({
    form: formSelector(state),
    response: responseSelector(state)
  }),
  dispatch => ({
    onChangeForm: value => dispatch(onChangeForm(value)),
    sendEmail: form => sendEmail(form)(dispatch),
    setResponse: res => dispatch(setResponse(res))
  })
)(
  class extends React.Component {
    constructor() {
      super()
      this.state = { displayModal: false }
    }
    onChangeForm(e) {
      this.props.onChangeForm({ [e.target.id]: e.target.value })
    }

    isButtonEnabled() {
      const { nom, prenom, email, message } = this.props.form
      return nom !== undefined
        && prenom !== undefined
        && email !== undefined
        && message !== undefined
        && this.props.form['g-recaptcha-response'] !== undefined
    }


    render() {
      console.log(this.props);
      const { classes } = this.props
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Boïce Photo | Contact </title>
          </Helmet>
          <Modal header='coucou' show={this.props.response !== undefined && this.props.response.ok}>
            <h1>Message envoyé</h1>
            {/* <Button
              waves='light'
              onClick={() => this.props.setResponse(undefined)}
            >Fermer</Button> */}
          </Modal>
          <h1>Contact</h1>
          <p>Si vous voulez m'addresser des mots doux, n'hésitez surtout pas.</p>
          <div className={classes.root}>

            <Grid container spacing={24}>
              <Grid xs={6} className={classes.grid}>
                <TextField
                  id='nom'
                  className={classes.textField}
                  required
                  label="Nom"
                  margin="normal"
                  onChange={(e) => this.onChangeForm(e)}
                  value={this.props.form.nom}
                />

              </Grid>
              <Grid xs={6} className={classes.grid}>
                <TextField
                  id='prenom'
                  className={classes.textField}
                  required
                  label="Prénom"
                  margin="normal"
                  onChange={(e) => this.onChangeForm(e)}
                  value={this.props.form.prenom}
                />

              </Grid>
              <Grid xs={6} className={classes.grid}>
                <TextField
                  id='email'
                  className={classes.textField}
                  label="email"
                  margin="normal"
                  onChange={(e) => this.onChangeForm(e)}
                  type="email" label="Email"
                  value={this.props.form.email}
                />

              </Grid>
              <Grid xs={6} className={classes.grid}>

                <TextField
                  id='sujet'
                  className={classes.textField}
                  label="sujet"
                  margin="normal"
                  onChange={(e) => this.onChangeForm(e)}
                  label="Sujet"
                  value={this.props.form.sujet}
                />
              </Grid>
            </Grid>
          </div>
          <TextField
            id='message'
            className={classes.multiline}
            multiline
            rows="5"
            label="Message"
            margin="normal"
            onChange={(e) => this.onChangeForm(e)}
            s={6}
            value={this.props.form.message}
          />
          <Captcha
            sitekey='6LfNfjoUAAAAAP8XWyo1-lyspeqsa1AyyydzT2-P'
            lang='fr'
            type='image'
            callback={(value) => this.props.onChangeForm({ 'g-recaptcha-response': value })}
          />
          <Button
            waves='light'
            onClick={() => this.props.sendEmail(this.props.form)}
            disabled={!this.isButtonEnabled()}>Envoyer</Button>
        </div>
      )
    }
  }
)

export default withStyles(styles)(Contact)
