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

//Add article
app.get('/article/add', function(req, res) {
  res.render('add_article', {
    title: 'Add Article'
  });
});

app.post('/article/add', urlencodedParser, function(req, res) {
  var article = new Article(req.body).save(function(err, article) {
    if(err)
      console.log(err);
    else
      res.redirect('/');
  });
});

//View Article
app.get('/article/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if(err)
      console.log(err);
    else {
      res.render('article', {
        title: 'Article',
        article: article
      });
    }
  });
});

//Edit Article
app.get('/article/edit/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    });
  });
});

app.post('/article/edit/:id', urlencodedParser, function(req, res) {
  var article = req.body;
  var id = {_id: req.params.id};
  Article.update(id, article, function(err) {
    if(err)
      console.log(err);
    else
      res.redirect('/');
  });
});

//Delete Article
app.delete('/article/:id', function(req, res) {
  var id = {_id: req.params.id};
  Article.remove(id, function(err) {
    if(err)
      console.log(err);
    else
      res.send('success');
  });
});

//Listen to port
if(!module.parent) {
  app.listen(3000, function() {
    console.log('Listening to port 3000');
  });
}
