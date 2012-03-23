
var util = require('util'),
    Store = require('./store');

exports = module.exports = Topic;

util.inherits(Topic, Store);

function Topic(id) {

    this.id = id;

};