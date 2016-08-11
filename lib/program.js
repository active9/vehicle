var program = require('commander');
var pkg = require('../package.json');

module.exports = program
	.version(pkg.version)
	.usage('[options]')
	.option('start [app]', 'starts the vehicle server')
	.option('stop [app]', 'stops the vehicle server')
	.option('status [app]', 'the vehicle server status')
	.option('dev [app]', 'starts the vehicle server in development mode')
	.option('servicestart [app]', 'starts the vehicle server service')
	.option('servicestop [app]', 'stops the vehicle server service')
	.option('serviceuninstall [app]', 'in conjunction with service uninstalls the vehicle server')
	.option('serviceinstall [app]', 'in conjunction with service installs the vehicle server')
	.option('-a, --app <directory>', 'location of app to load', process.cwd())
	.option('-p, --path <directory>', 'location of server.js', process.cwd())
	.option('-m, --mode <NODE_ENV>', 'try to force production or development mode', process.env.NODE_ENV)
	.option('-x, --skipbrowser', 'force prevent opening browser in development mode', false)
	.option('-s, --silent', 'print nothing to stdout', false)
	.option('-t, --threads <number>', 'force number of threads to use for clustering', 1)
	.parse(process.argv);