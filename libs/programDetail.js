const fs = require('fs-extra')
const { client } = require('./client')
const { getProgramDetailFile } = require('./constant')
const { saveWithFormat } = require('./save')

exports.getProgramDetail = async function (item) {
  const { listurl: url } = item
  const apiName = 'fmprogramdetaillistApiget'
  try {
    const { fmprogramdetaillist } = await client(apiName, { url })
    const { tvlist } = fmprogramdetaillist
    if (!tvlist && !tvlist.length) {
      return Promise.reject('program detail got null')
    }

    const filePath = getProgramDetailFile(item)
    if (!fs.existsSync(filePath)) {
      await saveWithFormat(filePath, { list: tvlist })
      return
    }

    const { list } = await fs.readJSON(filePath)
    const newData = []
    for (const episode of tvlist) {
      if (!isNewEpisode(episode, list[0])) {
        break
      }
      newData.push(episode)
    }
    const newList = newData.concat(list)
    await saveWithFormat(filePath, { list: newList })
  } catch (e) {
    return Promise.reject(e)
  }
}

function isNewEpisode(curr, target) {
  const getDiffValue = (item) => item.globalid
  return getDiffValue(curr) > getDiffValue(target)
}
