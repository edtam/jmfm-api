require('dotenv').config()
const fs = require('fs-extra')
const { programListPath } = require('../libs/path')
const { updateProgramDetail } = require('../libs/programDetail')
const { updateProgramList } = require('../libs/programList')

async function main() {
  try {
    await updateProgramList()
    if (!fs.existsSync(programListPath)) {
      throw new Error('programList not exist')
    }

    const { list } = await fs.readJSON(programListPath)
    for (const item of list) {
      console.log(item.id, item.title)
      await updateProgramDetail(item)
    }
  } catch (e) {
    console.error(e)
  }
}

main()
