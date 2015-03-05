var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linksSchema = mongoose.Schema({
  //Do we need id?
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
  //timestamps: {type: Date, default: Date.now}
});

linksSchema.methods.hashPassword = function(){

}

var Link = mongoose.model('Link', db.linksSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });



module.exports = Link;
