const fs = require('fs-extra')

exports.saveWithFormat = async function (filePath = '', obj = {}) {
  const data = {
    time: Date.now(),
    ...obj,
  }
  const content = JSON.stringify(data, null, 2)

  await fs.ensureFile(filePath)
  await fs.writeFile(filePath, content)
}
