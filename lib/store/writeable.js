
/**
 * Import dependencies
 */
var util = require('util'),
    
    Memory = require('./memory');

/**
 * Export the constructor
 */
exports = module.exports = Writeable;

/**
 * Inherit EventEmitter
 */
util.inherits(Writeable, Memory);

/**
 * Writeable
 * @param {hash} items
 */
function Writeable(items) {

    this.items = items || {};

}

/**
 * Write to all items
 * @param {string|object} data
 * @param {string} encoding
 * @return {void}
 */
Writeable.prototype.write = function(data, encoding) {

    for (key in this.items) {

        this.get(key).write(data, encoding);

    }

};