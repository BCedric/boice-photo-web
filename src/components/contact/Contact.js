import Helmet from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'

import {
  sendEmail,
} from 'redux/contact-redux/actions'
import { TextField, Button, CircularProgress, SnackbarContent, Snackbar } from '@material-ui/core'
import config from 'config'
import Fade from 'components/Fade'

function Contact() {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [object, setObject] = useState('')
  const [message, setMessage] = useState('')
  const [isRenderingCaptcha, setIsRenderingCaptcha] = useState(false)
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadReCaptcha(config.captchaSecretKey)
  }, [])

  const captchaCallback = (captchaToken) => {
    sendEmail({ lastName, firstName, email, message, object, captchaToken })
      .then(res => {
        setResponse(res.msg)
        setIsRenderingCaptcha(false)
        setIsLoading(false)
      })
  }

  const isButtonEnabled = () => {
    return lastName !== ''
      && firstName !== ''
      && email !== ''
      && message !== ''
  }

  const submit = () => {
    setIsRenderingCaptcha(true)
    setIsLoading(true)
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Boïce Photo | Contact </title>
        <meta name="description" content="Boïce Photo contact" />
      </Helmet>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={response != null}
        autoHideDuration={6000}
        onClose={() => setResponse(null)}
      >
        <SnackbarContent
          message={response}
        />

      </Snackbar>
      <Fade>
        <h1>Contact</h1>
        <p>Si vous voulez m'addresser des mots doux, n'hésitez surtout pas.</p>
        <div>
          <div className="form-line">
            <TextField
              name='lastName'
              required
              label="Nom"
              margin="normal"
              onChange={(e) =>
                setLastName(e.target.value)
              }
              value={lastName}
            />

            <TextField
              name='firstName'
              required
              label="Prénom"
              margin="normal"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="form-line">
            <TextField
              name='email'
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
              value={email}
            />
            <TextField
              name='object'
              margin="normal"
              onChange={(e) => setObject(e.target.value)}
              label="Sujet"
              value={object}
            />
          </div>
        </div>
        <div className="form-line">
          <TextField
            name='message'
            className="message"
            multiline
            rows="5"
            label="Message"
            margin="normal"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="form-line">
          {isRenderingCaptcha && <ReCaptcha
            sitekey={config.captchaSecretKey}
            action='submit_contact_form'
            verifyCallback={captchaCallback}
          />}
        </div>
        <div className="buttons-form-action">
          <Button
            waves='light'
            onClick={() => submit()}
            disabled={!isButtonEnabled()}>Envoyer</Button>
        </div>
        {isLoading && <CircularProgress />}
      </Fade>
    </div >
  )
}

export default Contact
