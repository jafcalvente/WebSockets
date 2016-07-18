// Run express library
var express = require('express');
var app = express();

// This array stores the messages
var messages = [{
		author: 'jafcalvente',
		text: 'This is a message'
	}];

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

// Defines what it's going to happen when the application receives the message of connection
io.on('connection', function(socket) {
	console.log('Someone is connected by socket.');

	// Now we can send information using the key server-messages. Client should be listening to this key
	socket.emit('server-messages', messages);

	// Server will be listening to messages that use the key client-message
	socket.on('client-message', function(data) {

		// Push the new message into the storage array
		messages.push(data);

		// This method emit the message to all connected clients through the key server-messages
		io.sockets.emit('server-messages', messages);
	});
})

// Run server
server.listen(8080, function() {
	console.log('Server running on http://localhost:8080')
});