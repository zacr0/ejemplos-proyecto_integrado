/*
 * Primero necesitamos crear nuestro
 * servidor que será un servidor http
 */
var http = require('http');


/*
 * Creamos el servidor y un callback
 * que contendrá una respuesta(res) y una
 * solicitud(req)
 */
http.createServer(function (req, res) {
  // Indicamos el tipo de contenido
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World\n'); // Escribimos la respuesta
  res.end(); // El método end se DEBE de poner
}).listen(3000); // Escuchamos el servidor por el puerto 3000

// Mensaje de log que aparecerá en la consola
console.log('Server running at http://localhost:3000/');
