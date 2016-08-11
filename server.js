/**
 * Vehicle - ORM MVC DRS with REST on Express
 * Version: 1.0 (Tin Lizzie)
 */
var path = require('path');

function loadApp(options) {
  if (typeof options === "undefined") {
    options = {
      "app": false
    };
  }
  if (options.app) {
    var workerbug = options.app;
    options.app = path.resolve(""+ options.app +"");
    options.app = options.app.replace(workerbug+"/"+workerbug,workerbug);
    options.app = options.app.replace(workerbug+"\\"+workerbug,workerbug);
  } else {
    options.app = false;
  }

  if (options.app) {
    console.log("APP",options.app);
    process.chdir(options.app);
  }

  return options;
}

var vehicle = function (options) {
  console.log("Vehicle: Starting Up.. Vroom Vroom!");
  options = loadApp(options);

  var env = process.env.NODE_ENV;
  console.log("Engine Mode: "+ env +"");

  var express = require('express');
  var cluster = require('express-cluster');

  if (env === "development") {
    require('./development.js')(options.app,express,null);

  } else if (env === "production") {
    cluster(function(worker) {
      require('./production.js')(options.app,express,worker);
    }, require(options.app +'/configs/production/workers.json'));

  } else if (env === "test") {
    require('./test.js')(options.app,express,null);

  } else {
    console.log("Warning: Vehicle may only run in a 'test', 'development', or 'production' environment.");
    console.log("Your environment is currently set to: ", env);
    console.log("To change your env try: set NODE_ENV=development in your console.");
  }
}
module.exports = vehicle;

// Ignition Bootstrapper 
var options = loadApp(options);
if (options.app) {
  if (path.basename(process.mainModule.filename)=="server.js") {
    vehicle({
      "app": options.app
    });
  }
    
} else {
  console.log("Vehicle: Invalid Options Passed. Try vehicle --help");
}
