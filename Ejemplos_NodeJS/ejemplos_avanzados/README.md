Ejemplos avanzados
===========================

Ejemplos de desarrollo en node.js + MongoDB más complejos.

**Listado de ejemplos:**
- **twitterfollowing:** obtiene el primer follower de una cuenta de Twitter, a través de una comunicación con la API.
- **twitterfollowingmongo:** ampliación del ejemplo anterior, esta vez creando un Schema Usuario (mediante el módulo Mongoose) desde una base de datos MongoDB.
- **twitterfollowingmongoarray:** mejora el ejemplo **twitterfollowingmongo**, donde ahora se realiza la misma función de forma asíncrona, mediante la función async.eachSeries de node.js.