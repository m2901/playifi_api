const fs = require('fs');
const path = require('path');
module.exports = recursiveRoutes;

let routesArray = [];

function recursiveRoutes(folderName = Path.getComponentBasePath()) {
  fs.readdirSync(folderName)
    .map((file) => {
      const fullName = path.join(folderName, file);
      const stat = fs.lstatSync(fullName);
      if (stat.isDirectory()) {
        recursiveRoutes(fullName);
      } else if (file.toLowerCase().indexOf('.js') && file.toLowerCase().includes('.route.')) {
        let path = require(`${fullName}`);
        routesArray = routesArray.concat(path);
      }
    });
  return routesArray;
}