var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//setup template engine
app.set('view engine' , 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen port
app.listen(3000);
console.log('You are listening to port 3000');
