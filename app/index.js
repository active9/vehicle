/*
 * Vehicle - Test Application
 */

module.exports = function (app,rc,express,weiv,orm,drivers,passport,__basedir) {

  // App Config
  var config = require('./config.json');

  // Routes
  for (route in config.routes) {
    rc(app, require('./routes/'+ config.routes[route]));
  }

  // Strategies
  if (require('./configs/'+process.env.NODE_ENV+'/passport.js').enabled) {
    app.use(passport.initialize());
    app.use(passport.session());
    var strategies = require('./strategies/strategies.js')(app,rc,express,weiv,orm,drivers,passport,__basedir);
  }

  // Assets Directory
  var assetConfig = require('./configs/'+process.env.NODE_ENV+'/asset.js');
  app.use('/'+ assetConfig.path +'', express.static(__basedir + '/'+ assetConfig.dir +''));

  // Fixed Index
  app.get('/', function(req, res) {
    var template = __basedir + '/views/index.html';
    weiv.view(template, res, [{VEHICLE: 'Vehicle'}]);
  });
};