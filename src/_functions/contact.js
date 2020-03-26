const sgMail = require('@sendgrid/mail')
const querystring = require('querystring')
const base64 = require('base-64')
const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().allow(''),
  message: Joi.string().required(),
})

// 1. check for ENV vars here
const { SENDGRID_API_KEY, SENDGRID_SENDER_NAME } = process.env
const SENDGRID_SENDER_EMAIL = 'renedellefont@gmail.com'

sgMail.setApiKey(SENDGRID_API_KEY)

exports.handler = async function (event) {
  let forminfo
  if (event.isBase64Encoded) {
    forminfo = JSON.parse(base64.decode(event.body))
  } else {
    forminfo = event.body
  }
  console.log('forminfo')
  console.log(forminfo)

  // AJAX v REGULAR
  // Get the form stuff (either from the AJAX request or the no-JS one)
  const body = {}

  // try {
  //   // did this request come from the AJAX side of things?
  //   body = JSON.parse(event.body)
  // } catch (e) {
  //   // if not, it is a direct submission due to no JavaScript on user client
  //   body = querystring.parse(event.body)
  // }

  // Return result.
  const { error, value } = Joi.validate(forminfo, schema)
  if (error) {
    console.log('some error')
    // your server-side functionality
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.details.message,
      }),
    }
  }

  // SEND mail
  const msg = {
    to: SENDGRID_SENDER_EMAIL,
    from: forminfo.email,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: forminfo.message,
  }
  await sgMail.send(msg).catch((error) => {
    console.log('send not success')
    // Log friendly error
    console.error(error.toString())

    // Extract error msg
    const { message, code, response } = error

    // Extract response msg
    const { headers, body } = response
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  })
  console.log('send success')
  return {
    statusCode: 200,
    body: JSON.stringify({
      formSubmitted: true,
    }),
  }

  // your server-side functionality
}
