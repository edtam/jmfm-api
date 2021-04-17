exports.JMYWT_TOKEN = process.env.JMYWT_TOKEN

exports.programListFile = 'data/list.json'

exports.getProgramDetailFile = function (item) {
  return `data/pg-${item.id}.json`
}
