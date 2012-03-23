
exports = module.exports = Store;

function Store() {

    this.items = {};

};

Store.prototype.attach = function(item) {

    if ('undefined' === typeof this.items[item.id]) {

        this.items[item.id] = item;

    }

};

Store.prototype.detach = function(item) {

    if ('undefined' !== typeof this.items[item.id]) {

        delete this.items[item.id];

    }

};

Store.prototype.get = function(id) {

    if ('undefined' !== typeof this.items[id]) {

        return this.items[id];

    }

};

Store.prototype.write = function(data) {

    for(item in this.items) {

        item.write(data);

    }

};