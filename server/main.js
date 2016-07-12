// Run express library
var express = require('express');
var app = express();

// Let's use the Server method of http library instead of express as
// web server because Socket.io works better with this kind of server
var server = require('http').Server(app);

// Run socket.io library
var io = require('socket.io')(server);

// Run server
server.listen(8080, function() {
	console.log('Server running on http://localhost:8080')
});
