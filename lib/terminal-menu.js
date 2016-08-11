var tmp = require("terminal-menu-program"),
    program = new tmp.Program("Test program"),
    Vehicle = require("../server.js");

var mainMenu = (function(program) {
  var menu = program.menu("main");
  menu.text("VEHICLE TERMINAL");
  menu.text("--------------------------------------------------------------------------------------------");
  menu.spacer();
  menu.text("Welcome to the vehicle terminal menu. Please select an option below.");
  menu.spacer();
  menu.option("Vehicle Information", "main1");
  menu.option("Vehicle Control", "main2");
  menu.option("Service Management", "main3");
  menu.option("Vehicle Environment", "main5");
  menu.option("Vehicle Tools", "main0");
  menu.spacer();
  menu.cancel("Exit", function() {
    program.halt();
    process.exit(0);
  });
  return menu;
}(program));

var subMenu0 = (function(program) {
  var menu = program.menu("main0");
  menu.text("VEHICLE TOOLS");
  menu.spacer();
  menu.text("Running an option below will end the vehicle terminal.");
  menu.spacer();
  menu.confirm("Start Vehicle Command Line", null, function(data) {
	menu.close();
	program.halt();
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	require('./vcl.js');
  });
  menu.confirm("Run Vehicle Sample App", null, function(data){
	menu.close();
	program.halt();
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	Vehicle({"app": "app"});
  });
  menu.option("Vehicle App Generator", "main4");
  menu.spacer();
  menu.cancel("back", "main");
  return menu;
}(program));

var subMenu1 = (function(program) {
  var menu = program.menu("main1");
  menu.text("VEHICLE INFORMATION");
  menu.spacer();
  menu.text("Running an option below will end the vehicle terminal.");
  menu.spacer();
  menu.confirm("Show Vehicle Environment", null, function(data) {
	menu.close();
	program.halt();
	require('./ascii-splash');
	require('./environment-log');
  });
  menu.confirm("Check For Updates", null, function(data) {
	menu.close();
	program.halt();
	require('./updater.js');
  });
  menu.spacer();
  menu.cancel("back", "main");
  return menu;
}(program));

var subMenu2 = (function(program) {
  var menu = program.menu("main2");
  menu.text("VEHICLE CONTROL");
  menu.spacer();
  menu.option("Start Vehicle", null, function(data) {
	menu.close();
	program.halt();
	require('./start.js')(process.cwd());
  });
  menu.option("Stop Vehicle", null, function(data) {
	menu.close();
	program.halt();
	require('./stop.js')(process.cwd());
  });
  menu.option("Vehicle Status", null, function(data) {
	menu.close();
	program.halt();
	require('./status.js')(process.cwd());
  });
  menu.spacer();
  menu.cancel("back", "main");
  return menu;
}(program));

var subMenu3 =(function(program){
  var menu = program.menu("main3");
  menu.text("VEHICLE SERVICE MANAGEMENT (BETA)");
  menu.spacer();
  menu.text("Vehicle Service Status: Stopped");
  menu.spacer();
  menu.option("Start Service", null, function(data) {
	menu.close();
	program.halt();
	require('../service.js')(process.cwd(),"start");
  });
  menu.option("Stop Service", null, function(data) {
	menu.close();
	program.halt();
	require('../service.js')(process.cwd(),"stop");
  });
  menu.option("Install Service", null, function(data) {
	menu.close();
	program.halt();
	require('../service.js')(process.cwd(),"install");
  });
  menu.option("Uninstall Service", null, function(data) {
	menu.close();
	program.halt();
	require('../service.js')(process.cwd(),"uninstall");
  });
  menu.spacer();
  menu.cancel("back", "main", function(data) { /* ... */ });
}(program));

var subMenu5 = (function(program) {
  var menu = program.menu("main4");
  menu.text("VEHICLE APP GENERATOR");
  menu.spacer();
  menu.confirm("Create A New Vehicle App", null, function(data) {
	menu.close();
	program.halt();
	require('./generator.js');
  });
  menu.cancel("back", "main");
  return menu;
}(program));

var subMenu5 = (function(program) {
  var menu = program.menu("main5");
  menu.text("VEHICLE ENVIRONMENT");
  menu.spacer();
  menu.confirm("Set Environment", "Envmain");
  menu.cancel("back", "main");
  return menu;
}(program));

program.env = {};
var setEnvironment = function(env) {
  program.env.NODE_ENV = env;
  process.env.NODE_ENV = env;
  program.run("main");
}

var mainEnvMenu = (function(program) {
  var menu = program.menu("Envmain");
  console.log(menu);
  
  menu.text("VEHICLE ENVIRONMENT");
  menu.text("--------------------------------------------------------------------------------------------");
  menu.spacer();
  menu.option("Set Production Mode", null, function(data) {
    setEnvironment("production");
  });
  menu.option("Set Development Mode", null, function(data) {
    setEnvironment("development");
  });
  menu.option("Set Test Mode", null, function(data) {
    setEnvironment("test");
  });
  menu.spacer();
  menu.cancel("back", "main");
  return menu;
}(program));

program.run("main");
