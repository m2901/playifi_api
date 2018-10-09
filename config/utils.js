const fs = require('fs');
const path = require('path');
const utilsPath = Path.getUtilsBasePath();
const utils = {};

fs.readdirSync(utilsPath)
  .filter((file) => ((file.indexOf('.') !== 0) && (file !== 'index.js')))
  .forEach((file) => {
    let fullName = path.join(utilsPath, file);
    utils[file.split('.')[0]] = require(`${fullName}`);
  });

module.exports = utils;