var gas = require('gas')();
var fs = require('fs');
var path = require('path');
var LintStream = require('jslint').LintStream;
var options = {
    "edition": "es5",
    "length": 100
},
l = new LintStream(options);

// Container Exists
gas.container("lint", function() {

    gas.line("can pass jslint", function() {
    	var file = path.resolve('../server.js');
        l.on('data', function (chunk) {
        	if (chunk.errors) {
        		gas.fail('Lint errors: '+ chunk.errors.length);
        	} else if (chunk.ok) {
        		gas.pass('Lint ok');
        	}
        });
        l.write({file: file, body: fs.readFileSync(file).toString()})
    });

});