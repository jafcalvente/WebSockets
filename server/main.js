// Run express library
var express = require('express');
var app = express();

// Let's use the Server method of http library instead of express as
// web server because Socket.io works better with this kind of server
var server = require('http').Server(app);

// Using static middleware in order to can use static resources
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.status(200).send("Hello world!");
});


// Run socket.io library
var io = require('socket.io')(server);

// Defines what it's going to do when the application receives the message 'connection'
io.on('connection', function(socket) {
	console.log('Someone is connected by socket.');

	// Now we can send information using the key messages
	socket.emit('messages', {
		id: 1,
		text: 'This is a message',
		author: 'jafcalvente'
	});
})

// Run server
server.listen(8080, function() {
	console.log('Server running on http://localhost:8080')
});
