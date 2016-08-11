var Service = "";
var os = require('os');

module.exports = function(app,method) {

  // Detect Windows, Mac, Linux, or BSD
  var OS = os.type();

  if (OS.match(/^win/i)) {
    require('./lib/service-windows.js')(app,method);

  } else if (OS.match(/^mac/i)) {
    require('./lib/service-mac.js')(app,method);

  } else if (OS.match(/^nix/i)) {
    require('./lib/service-linux.js')(app,method);
    
  } else if (OS.match(/^bsd/i)) {
    console.log("Sorry Services Are Not Supported On BSD Platforms.");
  }

  console.log("Operating System Found:", OS);

}