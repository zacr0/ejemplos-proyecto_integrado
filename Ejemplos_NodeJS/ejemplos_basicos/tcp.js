var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Servidor eco\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

console.log('TCP en 127.0.0.1:1337');