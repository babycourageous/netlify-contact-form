const sgMail = require('@sendgrid/mail')
// const querystring = require('querystring')
// const base64 = require('base-64')
const Joi = require('@hapi/joi')

const { SENDGRID_API_KEY } = process.env
const SENDGRID_SENDER_EMAIL = 'renedellefont@gmail.com'
sgMail.setApiKey(SENDGRID_API_KEY)

const schema = Joi.object().keys({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().allow(''),
  message: Joi.string().required(),
})

exports.handler = async (event) => {
  // ONLY ALLOW POST REQUESTS
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } }
  }

  const forminfo = JSON.parse(event.body)

  const { error } = schema.validate(forminfo)
  if (error) {
    console.log(error)
    // your server-side functionality
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.details[0].message,
      }),
    }
  }

  try {
    // SEND mail
    const msg = {
      to: SENDGRID_SENDER_EMAIL,
      from: forminfo.email,
      subject: 'Sending with SendGrid is Fun',
      message: forminfo.message,
    }

    console.log(msg)

    await sgMail.send(msg)
    console.log('send success')
    return {
      statusCode: 302,
      headers: {
        Location: '/thanks.html',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ message: 'SUCCESS' }),
    }
  } catch (e) {
    console.log('send not success')
    // Log friendly error
    console.error(error.toString())

    // Extract error msg
    const { message, code, response } = error

    // Extract response msg
    // const { headers, body } = response
    return {
      statusCode: code,
      body: JSON.stringify({
        message,
      }),
    }
  }

  // // let forminfo
  // // if (event.isBase64Encoded) {
  // //   forminfo = JSON.parse(base64.decode(event.body))
  // // } else {
  // //   forminfo = event.body
  // // }
}
