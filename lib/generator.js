var clc = require('cli-color');
var prompt = require('prompt');
var fs = require('fs');
var unzip = require('unzip');
var fstream = require('fstream');
var path = require('path');

var schema = {
  properties: {
    app:  require("../generators/app.js"),
    directory:  require("../generators/directory.js"),
    description:  require("../generators/description.js"),
    dependencies:  require("../generators/dependencies.js")
  }
};

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.green;
var info = clc.cyan;

console.log(info("Welcome to the Vehicle App Generator"));

prompt.message = "Vehicle Generator ".white;

prompt.start();

prompt.get(schema, function (err, result) {


  console.log("");
  process.stdout.write("Vehicle App Generating.");

  if (!fs.existsSync(path.resolve(result['directory'].location))) {
	fs.mkdirSync(path.resolve(result['directory'].location));
  } else {
	console.log(error("ABORTING: Target project directory already exists."))
	process.exit(1);
  }
  if (fs.existsSync(path.resolve(result['directory'].location))) {
	process.stdout.write(".");
	var appDir = path.resolve(result['directory'].location +'/'+ result['app'].name);
	if (!fs.existsSync(appDir)) {
		process.stdout.write(".");
		fs.mkdirSync(appDir);
		process.stdout.write(".");
		if (fs.existsSync(appDir)) {
			process.stdout.write(".");

			// Write the generator.blah
			fs.writeFileSync(appDir +"/generator.blah", result['dependencies'].dependencies);
			process.stdout.write(".");

			// Required due to a strange fs bug
			if (fs.existsSync(appDir)) {
				process.stdout.write(".");
				var distribution = require('../generators/dist.js');

				var readStream = fs.createReadStream(path.resolve('generators/'+ distribution.app));
				var writeStream = fstream.Writer(appDir);

				readStream
					.pipe(unzip.Parse())
					.pipe(writeStream);

				process.stdout.write(".");

				process.stdout.write(". Done");
				console.log("");
				console.log(notice("SUCCESS: Vehicle App Generated At:"), appDir);
			} else {
				process.stdout.write("[x]");
				console.log("");
				console.log("FAILED: Your File System Did Not Respond Quick Enough To Generate A Vehicle App.");
			}

		} else {
			process.stdout.write("[x]");
			console.log("");
			console.log("FAILED: Directory Creation Failure. Can not generate "+ result['app'].name +" folder in "+ appDir +"");
		}
	} else {
		process.stdout.write("[x]");
		console.log("");
		console.log("FAILED: App directory ("+ appDir +") already exists.");
	}
  } else {
	process.stdout.write("[x]");
	console.log("");
	console.log("FAILED: Invalid App Directory. Does the folder ("+ appDir +") exist?");
  }


});