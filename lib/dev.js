var headlight = require('headlight');
var path = require('path');

module.exports = function(app) {
	if (app=="dev") {
		console.log("No Application Directory Passed");
		console.log("Try vehicle start path/to/your/app");
		process.exit(1);
	}
	process.env.NODE_ENV = "development";
	var vehicle = path.resolve(app);
	app = path.resolve(vehicle +'/starter.js');

	if (headlight.start(vehicle,app)) {
		console.log("Started..");

		// We Force Kill The Process Here In About 3 Seconds To Break out of our Child Task Runner
		setTimeout(function() {process.exit(1);},3000);
	} else {
		console.log("Start Failed..");
	}
}