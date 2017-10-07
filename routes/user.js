var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

var User = require('../models/userModel');

var passport = require('passport');

//Register user
router.get('/register', function(req, res) {
  res.render('register', {
    title: 'Register New User'
  });
});

router.post('/register', function(req, res) {
  if(req.body.password === req.body.confirm_password) {
    var user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err)
          console.log(err);
        else {
          user.password = hash;
          user.save(function(err) {
            if(err)
              console.log(err);
            else
              res.redirect('/user/login');
          });
        }
      });
    });
  }
  else {
    res.render('register', {
      title: 'Register New User'
    });
  }
});

//login
router.get('/login', function(req, res) {
  res.render('login', {
    title: 'Login'
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: false
  })(req, res, next);
});

//Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/user/login');
});

module.exports = router;
