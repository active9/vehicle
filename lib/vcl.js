var net = require('net');
var repl = require('repl');

var connections = 0;
var remoteconnections = 0;
console.log("Vehicle Command Line Started.");
console.log("For Help Type .help or See [http://nodejs.org/api/repl.html]")
repl.start({
	useColors: true,
	useGlobal: false,
	prompt: "vehicle> ",
	input: process.stdin,
	output: process.stdout
}).on('exit', function() {
	console.log("Vehicle Command Line Exiting");
	if (connections>0) {
		console.log("Force Closing "+ connections +" Open Connections");
	}
        process.exit(1);
});
net.createServer(function (socket) {
  remoteconnections += 1;
  repl.start({
    prompt: "vehicle TCP> ",
    input: socket,
    output: socket
  }).on('exit', function() {
    console.log("Vehicle TCP Exiting");
    if (remoteconnections>0) {
	console.log("Force Closing "+ remoteconnections +" Open Remote Connections");
    }
    socket.end();
  });
}).listen(5001);

function eval(cmd, context, filename, callback) {
  callback(null, result);
}