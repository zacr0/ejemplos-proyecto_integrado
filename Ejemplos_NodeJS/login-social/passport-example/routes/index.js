
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	title: 'Ejemplo de Passport JS',
  	user: req.user
  });
};