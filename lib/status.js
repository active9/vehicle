var headlight = require('headlight');
var path = require('path');

module.exports = function(app) {
	if (app=="status") {
		console.log("No Application Directory Passed");
		console.log("Try vehicle status path/to/your/app");
		process.exit(1);
	}
	var vehicle = path.resolve(app);

	console.log(headlight.status(vehicle));
}