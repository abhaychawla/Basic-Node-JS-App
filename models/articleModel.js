var mongoose = require('mongoose');

//Create a schema
var articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

//Create a model
var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
