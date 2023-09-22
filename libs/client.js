const { default: got } = require('got')
const { JMYWT_TOKEN } = process.env

const url = 'https://xcxapi.jmtv.cn/jmradioapp/index.php'
const codeSucceed = 1

async function client(apiName = '', data = {}) {
  const { body } = await got(url, {
    method: 'POST',
    searchParams: {
      m: 'admin',
      c: 'api',
      a: apiName,
      time: Date.now(),
    },
    form: {
      token: JMYWT_TOKEN,
      ...data,
    },
    responseType: 'json',
  })

  const { code } = body
  if (code !== codeSucceed) {
    throw new Error(`${apiName} with code ${code}`)
  }

  return body
}

module.exports = { client }
