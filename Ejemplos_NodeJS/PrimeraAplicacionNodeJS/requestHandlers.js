//var exec = require('child_process').exec; // Módulo para poder ejecutar comandos Linux
var querystring = require("querystring");
    fs = require('fs');
    formidable = require('formidable');

function start(response) {
  console.log('Manipulador de petición "iniciar" ha sido llamado');

  var body = '<!doctype>' +
  	'<html>' +
    '<head>' +
    '<meta charset="UTF-8"/>' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Submit text" />' +
    '</form>' +
    '</body>' +
    '</html>';
  //var sys = require('util'); // Módulo util
  //var child;
  /*exec('find /',
    { timeout : 10000, maxBuffer: 20000*1024 }, // 10 seg*/
      //function (error, stdout, stderr) {
  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.write(body);
  response.end();
  //});
  // Función para ejecutar comandos linux en Node.js
  /*exec('ls -lha', function (error, stdout, stderr) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(stdout);
    response.end();
  });*/

  /*function sleep(milliSeconds) {
    // Obten la hora actual
    var startTime = new Date().getTime();
    // Atasca la CPU
    while (new Date().getTime() < startTime + milliSeconds);
  }*/

  //sleep(10000);
  //return 'Hola Iniciar';
}

function upload(response, request) {
console.log("Request handler 'upload' was called.");
var form = new formidable.IncomingForm();
console.log("about to parse");

form.parse(request, function(error, fields, files) {
console.log("parsing done");
/* Possible error on Windows systems:
tried to rename to an already existing file */
fs.rename(files.upload.path, "/tmp/test.png", function(error) {
if (error) {
fs.unlink("/tmp/test.png");
fs.rename(files.upload.path, "/tmp/test.png");
}
});
response.writeHead(200, {"Content-Type": "text/html"});
response.write("received image:<br/>");
response.write("<img src='/mostrar' />");
response.end();
});
}

function mostrar(response) {
  console.log('Manipulador de petición "mostrar" ha sido llamado');
  fs.readFile('/tmp/test.png', 'binary', function (error, file){
  	if (error){
  		response.writeHead(500, {'Content-Type' : 'text/plain'});
  		response.write(error + '\n');
  		response.end();
  	} else {
  		response.writeHead(200, {'Content-Type' : 'image/png'});
  		response.write(file, 'binary');
  		response.end();
  	}
  });
}

exports.start = start;
exports.upload = upload;
exports.mostrar = mostrar;