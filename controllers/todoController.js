// creating some dummy data in the server
//instead of the hard code in the html file
var data = [{item : 'get milk'}, {item: 'take kids to school'}, {item: 'send mail'}];

module.exports = function(app){
  app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
  });

  app.post('/todo', function(req, res){

  });

  app.delete('/todo', function(req, res){

  });
};
