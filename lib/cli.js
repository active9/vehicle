'use strict';

var vehicle = require('../server.js');

module.exports = function (program) {


  var options = {
    path: program.path,
    mode: program.mode,
    skipbrowser: program.skipbrowser,
    silent: program.silent,
    threads: program.threads
  };

   if (options.mode) {
   	process.env.NODE_ENV = options.mode;
   }
   if (program.servicestart) {
	require('../service.js')(program.rawArgs[program.rawArgs.length-1],"start");
   } else if (program.start) {
	require('./start.js')(program.rawArgs[program.rawArgs.length-1]);
   } else if (program.servicestop) {
	require('../service.js')(program.rawArgs[program.rawArgs.length-1],"stop");
   } else if (program.stop) {
	require('./stop.js')(program.rawArgs[program.rawArgs.length-1]);
   } else if (program.dev) {
	require('./dev.js')(program.rawArgs[program.rawArgs.length-1]);
   } else if (program.serviceinstall) {
	require('../service.js')(program.rawArgs[program.rawArgs.length-1],"install");
   } else if (program.serviceuninstall) {
	require('../service.js')(program.rawArgs[program.rawArgs.length-1],"uninstall");
   } else if (program.status) {
	require('./status.js')(program.rawArgs[program.rawArgs.length-1]);
   } else {

	// If we Have program.args try to launch that app
	var app = false;
	if (program.rawArgs.length>2) {
		app = program.rawArgs[program.rawArgs.length-1];
	}
	if (app) {
		vehicle({
			"app": app
		});
	} else {
		require('./terminal-menu.js');
	}
   }

};
