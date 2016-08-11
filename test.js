/**
 * Vehicle Test Suite - ORM MVC DRS with REST on Express
 * Version: 1.0 (Tin Lizzie)
 */

module.exports = function(appdir,express,worker) {

if (appdir === false) {
	console.log("No Vehicle App Selected. Try vehicle test app");
	process.exit();
}

//////////////////////////////////////////////////////////////////
// CONFIG
//////////////////////////////////////////////////////////////////

var config = require(appdir +'/configs/'+ process.env.NODE_ENV +'/config.js');
GLOBAL.vehicle = {}

//////////////////////////////////////////////////////////////////
// ENGINE MODULES
//////////////////////////////////////////////////////////////////

var util = require('util'),
  merge = require('merge'),
  EventEmitter = require('events').EventEmitter;
  VehicleEmitter = function() {
    EventEmitter.call(this);
  };
  util.inherits(VehicleEmitter, EventEmitter);
  var vehicle = new VehicleEmitter();
  merge(vehicle,require(appdir +'/package.json'));
  merge(GLOBAL.vehicle,vehicle);
  GLOBAL.vehicle.emit('init');

var env = process.env.NODE_ENV,
  wheels = require(appdir +'/config.json'),
  http = require('http'),
  drivers = "",
  fs = require('fs'),
  express = express,
  session = require('express-session'),
  methodOverride = require('method-override'),
  _ = require('lodash'),
  app = express(),
  server = http.createServer(app);
  rc = require('express-route-controller'),
  weiv = require('weiv'),
  Waterline = require('waterline'),
  compression = require('compression'),
  morgan = require('morgan'),
  openurl = require('openurl'),
  cors = require('cors'),
  passport = require('passport'),
  bodyParser = require('body-parser');
  app.server = server;
  merge(GLOBAL.vehicle, {
    app: app,
    rc: rc,
    express: express,
    weiv: weiv,
    orm: orm,
    drivers: drivers,
    passport: passport,
    appdir: appdir
  });

//////////////////////////////////////////////////////////////////
// INSERT KEY INTO IGNITION
//////////////////////////////////////////////////////////////////

var config_weiv = require(appdir +'/configs/'+ env +'/weiv.js'),
  weiv_config = weiv.configure(config_weiv,appdir),
  orm = new Waterline(),
  config_orm = require(appdir +'/configs/'+ env +'/orm.js'),
  config_compression = require(appdir +'/configs/'+ env +'/compression.js'),
  config_log = require(appdir +'/configs/'+ env +'/log.js'),
  config_rest = require(appdir +'/configs/'+ env +'/rest.js'),
  config_cors = require(appdir + '/configs/'+ env +'/cors.js'),
  config_passport = require(appdir + '/configs/'+ env +'/passport.js'),
  config_api = require(appdir + '/configs/'+ env +'/api.js'),
  config_stacktrace = require(appdir + '/configs/'+ env +'/stacktrace.js');

//////////////////////////////////////////////////////////////////
// DRIVER TURN KEY MODELS
//////////////////////////////////////////////////////////////////

app.use(function( req, res, next) {
	res.weiv = weiv;
	next();
});
drivers = require(appdir +'/drivers/registry.js')(wheels.registry,orm,Waterline.Collection);

//////////////////////////////////////////////////////////////////
// POWERED ON
//////////////////////////////////////////////////////////////////

app.use(session(require(appdir +'/configs/'+ env +'/session.js')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

if (config_stacktrace.enabled) {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

if (config_passport.enabled) {
  app.use(passport.initialize()) & app.use(passport.session());
}

if (config_compression.compress) {
  app.use(compression());
}

if (config_log.access) {
  app.use(morgan(config_log.format, {stream: fs.createWriteStream(appdir +'/' + config_log.dir + '/' + config_log.access_log, {flags: 'a+'})}));
}

if (config_cors.cors) {
  app.use(cors());
}

//////////////////////////////////////////////////////////////////
// APP DRIVER
//////////////////////////////////////////////////////////////////

require(appdir +"/"+vehicle.main)(app,rc,express,weiv,orm,drivers,passport,appdir);
vehicle.emit('startup');

//////////////////////////////////////////////////////////////////
// REST API (Keyless Mode)
//////////////////////////////////////////////////////////////////
if (config_api.public) {
  app.use(require('apikey')(require(appdir +'/api/keys.js'), config_api.realm));
  if (config_rest.rest) {
    for (driver in drivers)
      for (crud in drivers[driver].crud) {
        crud = drivers[driver].crud;

        app.get('/api/'+crud, function(req, res) {
          app.models[drivers[driver].model].find().exec(function(err, models) {
            if(err) return res.json({ err: err }, 500);
            res.json(models);
          });
        });

        app.post('/api/'+crud, function(req, res) {
          app.models[drivers[driver].model].create(req.body, function(err, model) {
            if(err) return res.json({ err: err }, 500);
            res.json(model);
          });
        });

        app.get('/api/'+crud+'/:id', function(req, res) {
          app.models[drivers[driver].model].findOne({ id: req.params.id }, function(err, model) {
            if(err) return res.json({ err: err }, 500);
            res.json(model);
          });
        });

        app.delete('/api/'+crud+'/:id', function(req, res) {
          app.models[drivers[driver].model].destroy({ id: req.params.id }, function(err) {
            if(err) return res.json({ err: err }, 500);
            res.json({ status: 'ok' });
          });
        });

        app.put('/api/'+crud+'/:id', function(req, res) {
          // Don't pass ID to update
          delete req.body.id;

          app.models[drivers[driver].model].update({ id: req.params.id }, req.body, function(err, model) {
            if(err) return res.json({ err: err }, 500);
            res.json(model);
          });
        });
      }
    }
  }

	//////////////////////////////////////////////////////////////////
	// LADIES & GENTLEMEN START YOUR ENGINES
	//////////////////////////////////////////////////////////////////
	orm.initialize(config_orm, function(err, models) {
	  if(err) {
	    throw err;
	  }

	  app.models = models.collections;
	  app.connections = models.connections;
	  
	  // WAVE THE WHITE FLAG!
	  app.listen(config.port, function() {
      GLOBAL.vehicle.app = app;
      GLOBAL.vehicle.port = config.port;
      GLOBAL.vehicle.emit('ready');
	    console.log("Starting Diagnostic Tests");
			require(appdir +'/tests/tests');
	  });
	});
}