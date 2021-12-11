const fs = require('fs-extra')
const { client } = require('./client')
const { getProgramDetailPath } = require('./path')
const { saveWithFormat } = require('./save')

exports.updateProgramDetail = async function (item) {
  const { listurl: url } = item
  const apiName = 'fmprogramdetaillistApiget'
  const { fmprogramdetaillist } = await client(apiName, { url })
  const { tvlist } = fmprogramdetaillist
  if (!tvlist && !tvlist.length) {
    throw new Error('programDetail got null')
  }

  const filePath = getProgramDetailPath(item)

  //  之前没有就直接保存
  if (!fs.existsSync(filePath)) {
    await saveWithFormat(filePath, { list: tvlist })
    return
  }

  const { list } = await fs.readJSON(filePath)
  // 对比出新节目内容
  const newData = []
  for (const episode of tvlist) {
    if (!isNewEpisode(episode, list[0])) {
      break
    }
    newData.push(episode)
  }
  if (newData.length) {
    const newList = newData.concat(list)
    await saveWithFormat(filePath, { list: newList })
  }
}

function isNewEpisode(curr, target) {
  const getDiffValue = (item) => item.globalid
  return getDiffValue(curr) > getDiffValue(target)
}
