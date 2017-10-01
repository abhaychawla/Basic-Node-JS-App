var express = require('express');
var router = express.Router();

var Article = require('../models/articleModel');

//Add article
router.get('/add', function(req, res) {
  res.render('add_article', {
    title: 'Add Article'
  });
});

router.post('/add', function(req, res) {
  var article = new Article(req.body).save(function(err, article) {
    if(err)
      console.log(err);
    else
      res.redirect('/');
  });
});

//View Article
router.get('/:id', function(req, res) {
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
router.get('/edit/:id', function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    });
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

module.exports = router;
