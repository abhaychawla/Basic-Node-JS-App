var express = require('express');
var router = express.Router();

var Article = require('../models/articleModel');
var User = require('../models/userModel');

//Add article
router.get('/add', ensureAuthentication, function(req, res) {
  res.render('add_article', {
    title: 'Add Article'
  });
});

router.post('/add', function(req, res) {
  var article = new Article();
  article.title = req.body.title;
  article.author = req.user._id;
  article.desc = req.body.desc;
  article.save(function(err, article) {
    if(err)
      console.log(err);
    else
      res.redirect('/');
  });
});

//View Article
router.get('/:id', ensureAuthentication, function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if(err)
      console.log(err);
    else {
      User.findById(article.author, function(err, user) {
        if(err)
          console.log(err);
        else {
          res.render('article', {
            title: 'Article',
            article: article,
            author: user.name
          });
        }
      });
    }
  });
});

//Edit Article
router.get('/edit/:id', ensureAuthentication, function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if(article.author != req.user._id) {
      res.redirect('/');
    }
    else {
      res.render('edit_article', {
        title: 'Edit Article',
        article: article
      });
    }
  });
});

router.post('/edit/:id', function(req, res) {
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
router.delete('/:id', function(req, res) {
  var id = {_id: req.params.id};
  Article.remove(id, function(err) {
    if(err)
      console.log(err);
    else
      res.send('success');
  });
});

//Access Control
function ensureAuthentication(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/user/login');
  }
}

module.exports = router;
