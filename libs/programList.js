const { client } = require('./client')
const { programListPath } = require('./path')
const { saveWithFormat } = require('./save')

exports.updateProgramList = async function () {
  const apiName = 'fmprogramtoplistApiget'
  const { fmprogramtoplist = '' } = await client(apiName)
  const text = fmprogramtoplist.replace(/\s/g, '')
  const { pglist = [] } = JSON.parse(text)

  if (!pglist && !pglist.length) {
    throw new Error('programList got null')
  }

  await saveWithFormat(programListPath, { list: pglist })
}
