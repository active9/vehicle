# VEHICLE
![Vehicle](https://raw.githubusercontent.com/active9/vehicle/master/Vehicle.png)

Vehicle is an ORM MVC DRS with REST on Express. Designed for real time 
responsive applications: Vehicle follows a paradigm similar to the classic MVC pattern 
(models, views, and controllers). However, it expands to include drivers, routes, 
and strategies to help build SaaS applications quickly using ORM and CRUD.

** **Vehicle is not yet ready for production use** **USE AT YOUR OWN RISK*** *

Vehicle renders its MVC DRS Paradigm in a deferred manner.
The Model, View, Controller, Driver, Route, or Strategy may be used individually 
or combined. In fabrication vehicle can be utilized by developers to build core 
routines and modularize apps for combination with other vehicle applications.
By allowing each part to operate individually of the others in the Paradigm the 
memory management improves as well as the performance of written code.  
The M.V.C.D.R.S routine simplifies relational management in a structured route-able way.

# DEFINITIONS
MVC - Model View Controller
DRS - Driver Route Strategy
ORM - Object Relational Modelling

# REQUIREMENTS
NodeJS, NPM, Git

# INSTALLING
Git a copy from the repo and run npm install or use
```bash
npm install -g vehicle
```

# RUNNING
If you installed vehicle globally (with npm install vehicle -g) you will then
be able to run the vehicle console application supplied with vehicle by typing:

```bash
vehicle
```

# VEHICLE GUI
Vehicle will spawn into a command line TUI which will allow you to start or stop an application. To get started
you will need to generate a new vehicle application or use the app folder from the git repo or npm
package. To do so enter the app folder via command line (This assumes you have the files locally).
Then type in:
```bash
vehicle
```

# MANUALLY RUNNING APPS
Vehicle will run an application specified by the directory given as a second argument on the command line.
For example:
```bash
vehicle [app]
```

This would launch vehicle running from the app folder in the current working directory.

If all goes well vehicle will start the test application and launch your browser (If In Development Mode).
If your server is in Production mode you will have to manually visit localhost.rocks in your browser.

NOTE: If your env is set to blank vehicle will not launch. In order to launch vehicle set the environment
variable required (See Next Section)
NOTE: You may also call vehicle from within your app directory directly.


# ENVIRONMENT
Vehicle runs in a development or production environment. In development mode more debugging and console logging is enabled to help developers identify issues. In production mode vehicle runs multi-threaded and less console logging occurs.

To set the environment mode open your terminal or command prompt:

On Windows:
```bash
set NODE_ENV=development
```

On Windows Powershell:
```bash
$env:NODE_ENV="development"
```

On Linux/Mac:
```bash
export NODE_ENV=development
```

There are two valid options for the NODE_ENV when running vehicle. They are:
- development
- production

NOTE: You may also use the TUI option to set the environment for that single runtime without globally setting NODE_ENV.

#VEHICLE APP GENERATOR

Vehicle comes equipped with an application generator to help you kick-start your Vehicle application.
To launch the generator open your command prompt or teminal and type in:
```bash
vehicle
```
Now navigate to Vehicle Tools -> Vehicle App Generator -> Create A New Vehicle App . You will then be asked a series of questions to create your first Vehicle app.

app:name - Specify the name of your Vehicle based application be sure not to use spaces.

directory:location - Full path or location to where you would like to create an app. The folder must not already exist.

description:description - A short description of your project.

dependencies:dependencies - any npm packages you would like to include separated by spaces.

# DEVELOPERS
Vehicle is easy to learn and intuitive. If you already understand Model View Controller
logic and have had experience with nodejs we suggest you git clone the repo and check out
the app folders or generate a new vehicle app using the vehicle command prompt. Open said
app folder in your favorite file explorer. You will notice a very simple set of folders and
familiar files such as package.json and index.js. To get started open index.js.

# PROJECT REFERENCE

Vehicle uses waterline for ORM data management:

[waterline](https://www.npmjs.com/package/waterline) - Sails ORM

Vehicle uses the following application folder structure:

/api - Used to store api keys
/assets - JS, CSS, Image assets
/configs - Vehicle configurations
/controllers - Controllers
/drivers - Drivers
/logs - Log directory for application level logging
/models - Models
/routes - Routes
/strategies - Strategies
/tests - Tests
/views - Application View Templates

# MODELS

Vehicle uses models to define objectified data structures. All models are a module.exports waterline object. Example ORM's can be found in the app/models folder within the vehicle repository.

Example Model:
```javascript
module.exports = {
		"identity": "user",
		"connection": "myLocalDisk",
		"attributes": {
			"first_name": "string",
			"last_name": "string"
		}
}
```

All models use a waterline ORM. These represent data access for a specific database and also define the data table structure. The database may be one of any sails waterline connectors. For more information about waterline see: [npm/waterline](https://www.npmjs.com/package/waterline). 

# VIEWS

Vehicle uses the [weiv](https://www.npmjs.com/package/weiv) module (view backwards) to render templated output. Weiv and Vehicle by default are configured using the [vinegar](https://www.npmjs.com/package/vinegar) template engine. Other template engines will be added to weiv in the future. An example view can be found in the app/views directory.

Example View.
Since weiv loads vinegarjs at it's core you may use techniques defined by [vinegarjs.com](http://www.vinegarjs.com/). 

# CONTROLLERS
Vehicle uses controllers to allow you to create controller routes. Much like building controllers in other MVC setups the controllers in vehicle allow the user to further define processed views. Controllers utilize module.exports to render route views to objects which may be processed by the route. Example controllers can be found in the app/controllers directory.

Example Controller.
```javascript
module.exports = {
    myaction: function(req, res) {
	res.send("Hello World From hello world controller");
    },
    myotheraction: function(req, res) {
	res.send("This is a post action on hello world controller");
    }
};
```

# DRIVERS
Vehicle uses drivers to load object collections in driver or passenger mode. Drivers also expose a model, controller, & crud operations. In driver mode the driver is exposed by the drivers variable. This allows object interaction between multiple drivers. In passenger mode a driver returns no driver data. An example driver setup can be found in the app/drivers directory.

Example Driver.
```javascript
/*
 * Vehicle - Example Driver
 */
module.exports = function (drivers,orm,wc) {

	// User Model (Exposed Driver Mode)
	var User = require('./User.js')(orm,wc);
	var user = {
		model: User.model,
		crud: User.crud,
		controller: User.controller
	}
	drivers.user = user;

	// Pet Model (Unexposed Passenger Mode)
	var Pet = require('./Pet.js')(orm,wc);

	return drivers;
}
```

# ROUTES
Vehicle uses routes to define structured navigation & interaction with your MVCDRS setup. Routes by default
define interactions with express. These interactions define common routes to urls. By default vehicle looks for the file named wheel.js within the routes folder. An example route can be found within the app/routes directory.

Example Route:
```javascript
module.exports = {
    controllers: __dirname +'/../controllers',
    routes: {
	'/test': 'test#test',
        '/api': 'api#api',
        '/template': 'template#template',
        '/hello_world': 'hello_world#myaction',
        '/say_to_world': { action: 'hello_world#myotheraction', method: 'post' }
    }
}
```

# STRATEGIES
Vehicle uses strategies to define controlled routes. These would be routes that require specific login credentials, social logins, or any form of validation imaginable. By default vehicle uses [passport](https://www.npmjs.com/package/passport) to define strategies. An example strategy can be found in the app/strategies directory.

Example Strategy.
```javascript
var LocalStrategy = require('passport-local');

module.exports = function (app,rc,express,weiv,orm,drivers,passport,__basedir) {

	var users = require('./users.js')(passport,drivers.user);
	passport.use(users);
	app.post('/login', 
		passport.authenticate('local', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		}
	);

}
```

# NOTICE
This application runs in a development or production mode there is no guarantee Vehicle
is ready for production use as it is still in active development. Use at your own risk in a production
environment. It is highly suggested to put nginx infront of this service and proxy to the service via nginx. Notice currently there is no security set within the application.

# ROADMAP (AKA TODO)
- Sockets
- Robotic Controls (UAV's, Vehicle's, Ect)
- Security
- User Log-In
- Tests
- ISO Standards & Security


#CONTRIBUTING

We encourage forking. Feel free to fork & pull your new additions, or bug fixes.

#LICENSE
MIT
