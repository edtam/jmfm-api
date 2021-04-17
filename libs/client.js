const { default: got } = require('got')
const { JMYWT_TOKEN } = require('./constant')

const url = 'https://xcxapi.jmtv.cn/jmradioapp/index.php'
const codeSucceed = 1

async function client(apiName = '', data = {}) {
  try {
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

    if (body.code !== codeSucceed) {
      return Promise.reject(`${apiName} got code ${body.code}`)
    }

    return body
  } catch (e) {
    return Promise.reject(e.message)
  }
}

module.exports = { client }
