{
	"name": "Vehicle Hello World",
	"description": "The Vehicle ORMMVC Server.",
	"script": require('path').join(__dirname,'service.js'),
	"env": {
		"name": "WORK",
		"value": process.env['USERPROFILE']
	},
	wait: 2,
	grow: .5
}