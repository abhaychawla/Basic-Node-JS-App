var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');
var config = require('./database');
var bcrypt = require('bcryptjs');

module.exports = function(passport) {

  //LocalStrategy
  passport.use(new LocalStrategy(function(username, password, done) {
    //Match username
    var query = {username: username};
    User.findOne(query, function(err, user) {
      if(err)
        console.log(err);
      if(!user)
        return done(null, false, {message: 'No User Found!'});
      //Match password
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if(err)
          console.log(err);
        if(isMatch)
          return done(null, user);
        else
          return done(null, false, {message: 'Wrong Password!'});
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
}
