var headlight = require('headlight');
var path = require('path');

module.exports = function(app) {
	if (app=="start") {
		console.log("No Application Directory Passed");
		console.log("Try vehicle start path/to/your/app");
		process.exit(1);
	}
	var vehicle = path.resolve(app);
	app = path.resolve(vehicle +'/starter.js');

	if (headlight.start(vehicle,app)) {
		console.log("Started..");

		// @FIXME: We Force Kill The Process Here In About 3 Seconds To Break out of our Child Task Runner This is a Dirty Hack
		setTimeout(function() {process.exit(1);},3000);
	} else {
		console.log("Start Failed..");
	}
}