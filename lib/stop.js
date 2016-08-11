var headlight = require('headlight');
var path = require('path');

module.exports = function(app) {
	if (app=="stop") {
		console.log("No Application Directory Passed");
		console.log("Try vehicle stop path/to/your/app");
		process.exit(1);
	}
	var vehicle = path.resolve(app);

	if (headlight.stop(vehicle)) {
		console.log("Stopped..");
	} else {
		console.log("Stop Failed..");
	}
}