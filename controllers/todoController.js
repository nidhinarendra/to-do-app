var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database created on mlab.com
mongoose.connect('mongodb://nidhi-todo:test123@ds139322.mlab.com:39322/nidhi-todo');

//create a schema - this is like a blueprint to our data representation
var todoSchema = new mongoose.Schema({
  item: String
});

//we should create a model to base that model on a schema (can use capital letter to differentiate)
var Todo = mongoose.model('Todo', todoSchema);

//to add an item into the database
var itemA = Todo({item: 'sleep early'}).save(function(err){
  if (err) throw err;
  console.log('item added successfully');
})


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
