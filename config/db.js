var mongoose = require('mongoose');
mongoose.connect('mongodb://user:flyingmonky@ds011785.mlab.com:11785/staticapiservice')

var schema = mongoose.Schema
var userSchema = new schema({
  users: Array
})
mongoose.Promise = require('bluebird')
module.exports = mongoose.model('user', userSchema)
