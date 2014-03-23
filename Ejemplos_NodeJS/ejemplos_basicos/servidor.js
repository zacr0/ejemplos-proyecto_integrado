var http = require('http');

http.createServer(function(peticion, respuesta) {
	respuesta.writeHead(200, {'Content-Type': 'text/plain'});
	respuesta.end('Hola, mundo!\n');
}).listen(1337, 'localhost');

console.log('Servidor activado. Direccion: http://localhost:1337');