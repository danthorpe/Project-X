
/**
 * Export the constructor
 */
exports = module.exports = Memory;

/**
 * Memory
 * @param {hash} items
 */
function Memory(items) {

    this.items = items || {};

}

/**
 * Attach a item to storage
 * @param {object} item
 * @return {void}
 */
Memory.prototype.attach = function(item) {

    if ('undefined' === typeof this.items[item.id]) {

        this.items[item.id] = item;

    }

};

/**
 * Detach a item to storage
 * @param {object} item
 * @return {void}
 */
Memory.prototype.detach = function(item) {

    if ('undefined' !== typeof this.items[item.id]) {

        delete this.items[item.id];

    }

};

/**
 * Get an item from storage
 * @param {string} id
 * @return {object}
 */
Memory.prototype.get = function(id) {

    if ('undefined' !== typeof this.items[id]) {

        return this.items[id];

    }

};

/**
 * the total number of items
 * @return {void}
 */
Memory.prototype.count = function() {

    var size = 0,
        key;

    for (key in this.items) {

        if (this.items.hasOwnProperty(key)) size++;

    }

    return size;

}