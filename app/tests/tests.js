var glob = require('glob');
var path = require('path');
GLOBAL.vehicle.request = require('supertest');

// options is optional
glob('**/*spec.js', {}, function (er, files) {
  if (er) {
    console.log('Error:', er);
  }
  if (!files) {
    console.log('No Tests');
  } else {
    for(var file in files) {
      require(path.resolve(files[file]));
    }
  }
});