const fs = require('fs'),
  path = require('path');

module.exports = function getMainPugFiles() {
  let sourcePath = path.resolve('./src')
  let paths = fs.readdirSync(sourcePath)
  let mainPugFiles = paths.filter(function (path) {
    return !!path.match('.pug')
  })
  return mainPugFiles
}
