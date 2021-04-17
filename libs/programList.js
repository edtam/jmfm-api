const { client } = require('./client')
const { programListFile } = require('./constant')
const { saveWithFormat } = require('./save')

exports.getProgramList = async function () {
  const apiName = 'fmprogramtoplistApiget'
  try {
    const { fmprogramtoplist = '' } = await client(apiName)
    const text = fmprogramtoplist.replace(/\s/g, '')
    const { pglist = [] } = JSON.parse(text)
    if (!pglist && !pglist.length) {
      return Promise.reject('program list got null')
    }

    await saveWithFormat(programListFile, { list: pglist })
  } catch (e) {
    return Promise.reject(e)
  }
}
