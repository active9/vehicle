var os = require('os');

// Detect Windows, Linux, or Mac
var OS = os.type();
var spinner;

if (OS.match(/^win/i)) {
	var Spinner = require('cli-spinner').Spinner;

	spinner = new Spinner('Checking For Updates... %s');
	spinner.setSpinnerString('|/-\\');
	spinner.start();
} else {
	var Spinner = require('term-spinner');
	spinner = spin.new();
	setInterval(function () {
		spinner.next();
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write([spinner.current, "Checking For Updates..."].join(" "));
	});
}


//
// Update Check
//

var checkUpdate = require('check-update');
var pkg = require('../package.json');
 
checkUpdate({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
    if(!err){
	console.log();
	spinner.stop();
        console.log(defaultMessage);
    } else {
	console.log();
	spinner.stop();
	console.log(err);
    }
	}, 1000);