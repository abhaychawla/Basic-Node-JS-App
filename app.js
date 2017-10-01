var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Article = require('./models/articleModel');

//Init app
var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//Set static file folder
app.use(express.static('./public'));

//Connect to database
mongoose.connect('mongodb://localhost/node-project');

var db = mongoose.connection;
db.once('open', function() {
  console.log('Connected to mongodb');
});
db.on('error', function(err) {
  console.log(err);
})

//Middleware for parsing post request data using bodyParser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

//Home Path
app.get('/', function(req, res) {
  Article.find({}, function(err, articles) {
    if(err)
      console.log(err)
    else {
      res.render('index', {
        title: 'Home | Articles',
        articles: articles
      });
    }
  });
});

//Routes
var article = require('./routes/article');
app.use('/article', article);

//Listen to port
if(!module.parent) {
  app.listen(3000, function() {
    console.log('Listening to port 3000');
  });
}
