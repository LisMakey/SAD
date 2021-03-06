var net = require('net');

var client = new net.Socket();

exports.Start = function (host, port, cb) {
	client.connect(port, host, function() {
    	console.log('Connected to: ' + host + ':' + port);
    	if (cb != null) cb();
	});
}


var callbacks = {} // hash of callbacks. Key is invoId
var invoCounter = 0; // current invocation number is key to access "callbacks".

//
// When data comes from server. It is a reply from our previous request
// extract the reply, find the callback, and call it.
// Its useful to study "exports" functions before studying this one.
//
client.on ('data', function (data) {
	console.log ('data comes in: ' + data);
	var reply = JSON.parse (data.toString());
	switch (reply.what) {
		// TODO complete list of commands
		case 'get private message list':
		console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj); // call the stored callback, one argument
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'get public message list':
		case 'get subject list':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj); // call the stored callback, one argument
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'add private message':
		case 'add public message':
			console.log ('We received a reply for add command');
			callbacks [reply.invoId] (); // call the stored callback, no arguments
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'get subject':
		case 'login':
		console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj); // call the stored callback, one argument
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'get user list':
		case 'add subject':
		case 'add user':
		default:
			console.log ("Panic: we got this: " + reply.what);
	}
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

//
// on each invocation we store the command to execute (what) and the invocation Id (invoId)
// InvoId is used to execute the proper callback when reply comes back.
//
function Invo (str, cb) {
	this.what = str;
	this.invoId = ++invoCounter;
	callbacks[invoCounter] = cb;
}
//
//
// Exported functions as 'dm'
//
//
exports.addPrivateMessage = function  (msg, cb) {
	var invo = new Invo ('add private message', cb);	
	invo.msg = msg;
	client.write (JSON.stringify(invo));
}
exports.getPublicMessageList = function  (sbj, cb) {
	var invo = new Invo ('get public message list', cb);	
	invo.sbj = sbj;
	client.write (JSON.stringify(invo));
}
exports.getPrivateMessageList = function (u1, u2, cb) {
	invo = new Invo ('get private message list', cb);
	invo.u1 = u1;
	invo.u2 = u2;
	client.write (JSON.stringify(invo));
}
exports.getSubjectList = function (cb) {
	client.write (JSON.stringify(new Invo ('get subject list', cb)));
}
exports.getSubject = function  (sbj, cb) {
	var invo = new Invo ('get subject', cb);	
	invo.sbj = sbj;
	client.write (JSON.stringify(invo));
}
exports.addPublicMessage = function  (msg, cb) {
	var invo = new Invo ('add public message', cb);	
	invo.msg = msg;
	client.write (JSON.stringify(invo));
}
exports.login = function  (u, p, cb) {
	var invo = new Invo ('login', cb);	
	invo.u = u;
	invo.p = p
	client.write (JSON.stringify(invo));
}
exports.getUserList = function (cb) {
	client.write (JSON.stringify(new Invo ('get user list', cb)));
}
exports.addSubject = function  (s, cb) {
	var invo = new Invo ('add subject', cb);	
	invo.s = s;
	client.write (JSON.stringify(invo));
}
exports.addUser = function  (u,p, cb) {
	var invo = new Invo ('add user', cb);	
	invo.u = s;
	invo.p = p;
	client.write (JSON.stringify(invo));
}

// TODO: complete the rest of the forum functions.



