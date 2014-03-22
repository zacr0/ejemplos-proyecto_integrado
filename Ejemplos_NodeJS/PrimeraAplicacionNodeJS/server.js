var http = require('http'); // Llamada al módulo HTTP
var url = require('url'); // Llamada al módulo url

function iniciar(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Peticion para ' + pathname + ' recibida.');
    route(handle, pathname, response, request);
  }
  http.createServer(onRequest).listen(8888); // createServer es una función que devuelve un objeto
                 // éste objeto tiene un método llamado listen que toma
                 // un valor númerico que indica el puerto en el que
                 // nuestro servidor va a escuchar (8888 en nuestro caso).
  console.log('Servidor Iniciado.');
}

exports.start = iniciar;