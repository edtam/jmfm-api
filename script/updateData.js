require('dotenv').config()
const fs = require('fs-extra')
const { programListFile } = require('../libs/constant')
const { getProgramDetail } = require('../libs/programDetail')
const { getProgramList } = require('../libs/programList')

async function main() {
  try {
    await getProgramList()
    if (!fs.existsSync(programListFile)) {
      console.error('program list not exist')
      return
    }

    const { list } = await fs.readJSON(programListFile)
    console.log(`programs count ${list.length}`)
    for (const item of list) {
      console.log(item.id, item.title)
      await getProgramDetail(item)
    }
  } catch (e) {
    console.error(e)
  }
}

main()
