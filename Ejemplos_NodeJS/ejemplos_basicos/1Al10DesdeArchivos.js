var fs = require('fs');
var http = require('http');
var ficheros = ['fichero0.txt', 'fichero1.txt', 'fichero2.txt'];
var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var i, j, variable = '';

//function escribir() {
  for (i = 0; i < ficheros.length; i++) {
    for (j = 0; j < numeros.length; j++) {
      variable += 'número: ' + j + ' - ';
    }
    fs.writeFile(ficheros[i], variable, function (err) {
      if (err) {
        throw err;
      }
    });
    variable = '';
  } // for
//}
  console.log('Archivos de textos creados');

/*var hola = http.createServer(function (req, res) {
  console.log('Servidor arrancado');
  escribir();
  res.writeHead(200, {'Content-type': 'text/html'});
  res.end('Vamos a crear 3 ficheros de texto mira tu consola');
  console.log('Archivos de textos creados');
}).listen(3000, '127.0.0.1');*/