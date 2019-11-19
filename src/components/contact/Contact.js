import { connect } from 'react-redux'
import Captcha from 'react-captcha'
import Helmet from 'react-helmet'
import React from 'react'
// import Modal from 'components/Modal'

import {
  onChangeForm,
  sendEmail,
  setResponse
} from 'redux/contact-redux/actions'
import {
  formSelector,
  responseSelector
} from 'redux/contact-redux/selectors'
import { TextField, Button } from '@material-ui/core'

import './Contact.css'

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
      const { nom, prenom, email, sujet, message } = this.props.form
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Boïce Photo | Contact </title>
          </Helmet>
          {/* <Modal header='coucou' show={this.props.response !== undefined && this.props.response.ok}> */}
          {/* <h1>Message envoyé</h1> */}
          {/* <Button
              waves='light'
              onClick={() => this.props.setResponse(undefined)}
            >Fermer</Button> */}
          {/* </Modal> */}
          <h1>Contact</h1>
          <p>Si vous voulez m'addresser des mots doux, n'hésitez surtout pas.</p>
          <div>
            <div className="form-line">
              <TextField
                id='nom'
                required
                label="Nom"
                margin="normal"
                onChange={(e) => this.onChangeForm(e)}
                value={nom}
              />

              <TextField
                id='prenom'
                required
                label="Prénom"
                margin="normal"
                onChange={(e) => this.onChangeForm(e)}
                value={prenom}
              />
            </div>
            <div className="form-line">
              <TextField
                id='email'
                margin="normal"
                onChange={(e) => this.onChangeForm(e)}
                type="email"
                label="Email"
                value={email}
              />
              <TextField
                id='sujet'
                margin="normal"
                onChange={(e) => this.onChangeForm(e)}
                label="Sujet"
                value={sujet}
              />
            </div>
          </div>
          <TextField
            id='message'
            className="message"
            multiline
            rows="5"
            label="Message"
            margin="normal"
            onChange={(e) => this.onChangeForm(e)}
            value={message}
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
        </div >
      )
    }
  }
)

export default Contact
