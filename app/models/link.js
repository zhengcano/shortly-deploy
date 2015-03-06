var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// create schema
var linksSchema = mongoose.Schema({
  //Do we need id?
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
  //timestamps: {type: Date, default: Date.now}
});

linksSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code =shasum.digest('hex').slice(0, 5);
  next();
});

var Link = mongoose.model('Link', linksSchema);
module.exports = Link;
