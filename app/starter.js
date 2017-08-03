var vehicle = require('vehicle/server.js') || require('../server.js');
var path = require('path');
var script = path.resolve(__dirname);
process.chdir(path.resolve(script));

console.log('Vehicle: Starting App '+ script +'..');

vehicle({
  'app': script
});