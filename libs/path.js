exports.programListPath = 'data/list.json'

exports.getProgramDetailPath = function (item) {
  return `data/pg-${item.id}.json`
}
