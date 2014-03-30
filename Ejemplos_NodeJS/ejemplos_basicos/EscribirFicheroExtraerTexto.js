var fs = require('fs'); // Módulo

var file = 'out.txt'; // Fichero a crear/leer
var stream = fs.createWriteStream(file); // Creo el stream para escribir
// Creo el stream para leer con codificación utf-8
var readstream = fs.createReadStream(file, {encoding: 'utf8'});
var ficheros = ['hello', 'world', 'hello world!']; // Creo el parrafo

// Defino la función 
function read() {
  var buf;
  while (buf = readstream.read()) {
    console.log('Read from the file:', buf);
  }
}

var interval = function () {
  stream.write(ficheros[0] + '\n' + ficheros[1] + '\n' + ficheros[2]);
  stream.end();
};

interval();

readstream.on('readable', read);

readstream.once('end', function() {
  console.log('stream ended');
});

console.log('archivo .txt creado');