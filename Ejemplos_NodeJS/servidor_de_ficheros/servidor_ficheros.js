var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
     
http.createServer(function(peticion, respuesta) {
    var uri = url.parse(peticion.url).pathname;
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
        if(!exists) {
            respuesta.writeHead(404, {"Content-Type": "text/plain"});
            respuesta.write("404 No encontrado\n");
            respuesta.end();
            return;
        }
         
        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                respuesta.writeHead(500, {"Content-Type": "text/plain"});
                respuesta.write(err + "\n");
                respuesta.end();
                return;
            }
             
            respuesta.writeHead(200);
            respuesta.write(file, "binary");
            respuesta.end();
        });
    });
}).listen(8080);
 
sys.puts("Servidor funcionando en http://localhost:8080/");