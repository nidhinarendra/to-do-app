var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // use native mongoose promises﻿

//Connect to the database created on mlab.com
mongoose.connect('mongodb://nidhi-todo:test123@ds139322.mlab.com:39322/nidhi-todo');

//create a schema - this is like a blueprint to our data representation
var todoSchema = new mongoose.Schema({
  item: String
});

//we should create a model to base that model on a schema (can use capital letter to differentiate)
var Todo = mongoose.model('Todo', todoSchema);

//to add an item into the database
/*var itemA = Todo({item: 'sleep early'}).save(function(err){
if (err) throw err;
console.log('item added successfully');
})*/


// creating some dummy data in the server
//instead of the hard code in the html file
//var data = [{item : 'get milk'}, {item: 'take kids to school'}, {item: 'send mail'}];

//middle ware function
var urlencodedParser = bodyParser.urlencoded({extended:false});


module.exports = function(app){
  app.get('/todo', function(req, res){
    //get data from mongoDB and pass it to the view
    //we use the Todo model as thats the model which has the collection of our data
    //to find one item in the list we can use the below
    //Todo.find({item: 'buy milk'});

    //we need to find all the data available in the database for this app
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
      //data here is now the one obtained from the db.
      //find only finds it. render dispalys it
    });

  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get the data from the user and store it in the db
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data) //passing the updated data back to the view
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from db
    //the user requested data will be present in the :item
    //First we need to find it
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data); //passes back the updated data
    })
    //in a url the words would be separated with hyphens and hence we replace that with space
    //to find the exact item we are looking for in the db


  });
};
