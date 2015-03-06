var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: {type: String, index: { unique: true }},
  password: String
});

usersSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

usersSchema.method('comparePassword', function(attemptedPassword, callback){
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
});

var User = mongoose.model('User', usersSchema);

module.exports = User;
