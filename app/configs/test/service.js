{
	"name": "Vehicle Hello World",
	"description": "The Vehicle ORMMVC Server.",
	"script": require('path').join(__dirname,'service.js'),
	"env": {
		"name": "HOME",
		"value": process.env['USERPROFILE']
	}
}