var Service = require('node-mac').Service;
var path = require('path');

module.exports = function(app,method) {
	var package = require(path.resolve(path.resolve(app)+"/package.json"));
	console.log("Service:", package.name);
	console.log("Description:", package.description);
	console.log("Script:", path.resolve(app +"/starter.js"));
	console.log("Method:", method);
	var svc = new Service({
		name: package.name,
		description: package.description,
		script: path.resolve(app +"/starter.js"),
		wait: 5,
		grow: .5,
		maxRestarts: 3,
		env: {
			name: "NODE_ENV",
			value: process.env.NODE_ENV
		}
	});

	svc.on('error',function(e) {
		console.log("Service Error: ", e);
	});

	if (method=="install") {

		// INSTALL
		svc.on('install',function() {
			svc.start();
		});

		svc.install();
	} else if (method=="start") {

		// START
		svc.on('start',function() {
			console.log('Service Started..');
		});

		svc.start();
	} else if (method=="stop") {

		// STOP
		svc.on('stop',function() {
			console.log('Service Stopped..');
		});

		svc.stop();
	} else if (method=="uninstall") {

		// UNINSTALL
		svc.on('uninstall',function(){
			console.log('Uninstall complete.');
			console.log('The service exists: ',svc.exists);
		});

		svc.stop();
		svc.uninstall();
	}

}