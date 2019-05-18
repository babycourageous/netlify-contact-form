const dotenv = process.env.NODE_ENV !== 'production' ? require('dotenv') : null

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

exports.handler = async event => {
  console.log(event)

  try {
    const subject = event.queryStringParameters.name || 'World'
    return { statusCode: 200, body: `Hello ${subject}` }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
