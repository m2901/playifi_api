const fs = require('fs');
const path = require('path');
//const folder = Path.getComponentBasePath() + `` 
//console.log(Path.getComponentBasePath());
module.exports = recursiveService;

let serviceArray = [];

function recursiveService(folderName = Path.getComponentBasePath()) {
  fs.readdirSync(folderName)
    .map((file) => {
      const fullName = path.join(folderName, file);
      const stat = fs.lstatSync(fullName);
      if (stat.isDirectory()) {
        recursiveService(fullName);
      } else if (file.toLowerCase().indexOf('.js') && file.toLowerCase().includes('.service.')) {
        let path = require(`${fullName}`);
        serviceArray = serviceArray.concat(path);
      }
    });
  return serviceArray;
}