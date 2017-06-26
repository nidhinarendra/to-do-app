var bodyParser = require('body-parser');


// creating some dummy data in the server
//instead of the hard code in the html file
var data = [{item : 'get milk'}, {item: 'take kids to school'}, {item: 'send mail'}];

//middle ware function
var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function(app){
  app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res){
data.push(req.body);
res.render('todo', {todos: data});
res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
data = data.filter(function(todo){
  return todo.item.replace(/ /g, '-') !== req.params.item;
});
res.json(data);
  });
};
