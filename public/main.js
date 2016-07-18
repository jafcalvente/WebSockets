// Connecting with socket using library socket.io imported on index page
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

/**
 * Received message from server.
 */
socket.on('server-messages', function(data) {
	console.log(data);
	render(data);
});

var render = function(data) {

	// Use map function to create a div for each item and then join all of them
	var html = data.map(function(data, index) {
		return	`<div>
					<strong>${data.author}</strong>:
					<em>${data.text}</em>
				</div>`;
	}).join('');

	document.getElementById('messages').innerHTML = html;
};

/**
 * Send message to server.
 */
var addMessage = function(e) {
	var infoToSend = {
		author: document.getElementById('username').value,
		text: document.getElementById('text').value
	};

	// Clean textboxes
	document.getElementById('username').value = '';
	document.getElementById('text').value = '';

	// Send by socket the objet
	socket.emit('client-message', infoToSend);

	// Return false to not refresh the page
	return false
};