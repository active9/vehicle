var art = require('ascii-art');
art.font('V', 'Doom', 'yellow').font('ehicle', 'Doom', 'yellow', function(rendered){
    console.log(rendered);
	art.font('('+ require('../package.json').conical +')', 'Doom', 'yellow', function(rendered){
	    console.log(rendered);
		art.font('version '+ require('../package.json').version , 'Doom', 'white', function(rendered){
	    	console.log(rendered);
	    	require('./environment-log.js');
		});
	});
});