var mongoose = require('mongoose');

//Create a schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//Create a model
var User = mongoose.model('User', userSchema);

module.exports = User;
