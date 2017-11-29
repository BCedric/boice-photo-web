import { connect } from 'react-redux'
import Captcha from 'react-captcha'
import Helmet from 'react-helmet'
import React from 'react'
import { Input, Row, Button } from 'react-materialize'
import Modal from 'Modal'

import {
  onChangeForm,
  sendEmail,
  setResponse
} from 'contact-redux/actions'
import {
  formSelector,
  responseSelector
} from 'contact-redux/selectors'
import './styles/Contact.css'

const Contact = connect (
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
    constructor () {
      super()
      this.state = {displayModal: false}
    }
    onChangeForm(e) {
      this.props.onChangeForm({[e.target.id]: e.target.value })
    }

    isButtonEnabled () {
      const { nom, prenom, email, message} = this.props.form
      return nom !== undefined
        && prenom !== undefined
        && email !== undefined
        && message !== undefined
        && this.props.form['g-recaptcha-response'] !== undefined
    }


    render () {
      console.log(this.props);
      return (
        <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | Contact </title>
        </Helmet>
        <Modal header='coucou' show={this.props.response !== undefined && this.props.response.ok}>
        <h1>Message envoyé</h1>
        <Button
          waves='light'
          onClick={() => this.props.setResponse(undefined)}
        >Fermer</Button>
        </Modal>
          <h1>Contact</h1>
          <p>Si vous voulez m'addresser des mots doux, n'hésitez surtout pas.</p>
          <Row className='contactForm'>
          		<Input id='nom' onChange={(e) => this.onChangeForm(e)} s={6} label="Nom" value={this.props.form.nom} require />
          		<Input id='prenom' onChange={(e) => this.onChangeForm(e)} s={6} label="Prénom" value={this.props.form.prenom}/>
          		<Input id='email' onChange={(e) => this.onChangeForm(e)} type="email" label="Email" s={6} value={this.props.form.email}/>
              <Input id='sujet' onChange={(e) => this.onChangeForm(e)} label="Sujet" s={6} value={this.props.form.sujet}/>
              <textarea onChange={(e) => this.onChangeForm(e)} id="message" type="message" class="materialize-textarea" value={this.props.form.message} />
              <label for="message">Message</label>
              <br />
                <Captcha
                  sitekey = '6LfNfjoUAAAAAP8XWyo1-lyspeqsa1AyyydzT2-P'
                  lang = 'fr'
                  type = 'image'
                  callback = {(value) => this.props.onChangeForm({'g-recaptcha-response': value})}
                />
              <Button
                waves='light'
                onClick={() => this.props.sendEmail(this.props.form)}
                disabled = {!this.isButtonEnabled()}>Envoyer</Button>

          </Row>
        </div>
      )
    }
  }
)

export default Contact
