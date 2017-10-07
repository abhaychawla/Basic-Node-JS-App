var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Article = require('./models/articleModel');

var config = require('./config/database');

var passport = require('passport');

//Init app
var app = express();

//Set up template engine
app.set('view engine', 'ejs');

//Set static file folder
app.use(express.static('./public'));

//Connect to database
mongoose.connect(config.databaseURL);

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

//Passport config
require('./config/passport')(passport);

//Middleware for passport

var session = require("express-session");
app.use(session({ secret: config.secret }));

app.use(passport.initialize());
app.use(passport.session());

//Universal
app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

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

var user = require('./routes/user');
app.use('/user', user);

//Listen to port
if(!module.parent) {
  app.listen(3000, function() {
    console.log('Listening to port 3000');
  });
}
