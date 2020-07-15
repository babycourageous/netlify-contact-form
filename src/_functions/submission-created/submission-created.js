const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env
const SENDGRID_SENDER_EMAIL = 'renedellefont@gmail.com'
sgMail.setApiKey(SENDGRID_API_KEY)

exports.handler = async (event) => {
  // ONLY ALLOW POST REQUESTS
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } }
  }

  const data = JSON.parse(event.body)

  const { name, email, message: body, phone = '' } = data

  try {
    // SEND mail
    const msg = {
      to: SENDGRID_SENDER_EMAIL,
      from: {
        email,
        name,
      },
      subject: 'Sending with SendGrid is Fun',
      text: body,
      phone,
    }

    await sgMail.send(msg)
    console.log('send success')
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'SUCCESS' }),
    }
  } catch (e) {
    console.log('send not success')
    // Log friendly error
    console.error(e.toString())

    // Extract error msg
    const { message, code, response } = e

    // Extract response msg
    // const { headers, body } = response
    return {
      statusCode: code,
      body: JSON.stringify({
        message,
      }),
    }
  }

  // let forminfo
  // if (event.isBase64Encoded) {
  //   forminfo = JSON.parse(base64.decode(event.body))
  // } else {
  //   forminfo = event.body
  // }
}
