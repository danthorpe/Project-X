
/**
 * Import dependencies
 */
var http   = require('http'),
    util   = require('util'),
    events = require('events'),

    Connection = require('./connection');
    // Topic = require('./topic');

/**
 * Export the constructor
 */
exports = module.exports = Server;

/**
 * Inherit EventEmitter
 */
util.inherits(Server, events.EventEmitter);

/**
 * Server
 * @param {integer} port
 * @param {lambda} callback
 */
function Server(port, callback) {

    var self = this;

    this.port = port;
    this.http = new http.Server().listen(port);
    this.connection;

    /**
     * Serve http connection event
     * @return {void}
     */
    this.http.on('connection', function(socket) {

        self.emit('open', socket);

    });

    /**
     * Serve http close event
     * @return {void}
     */
    this.http.on('close', function() {

        self.emit('close');

    });

    /**
     * Serve http upgrade event
     * @param {[type]} request
     * @param {[type]} socket
     * @param {[type]} head
     * @return {void}
     */
    this.http.on('upgrade', function(request, socket, head) {

        self.openSocket(request, socket, head);

    });
};

/**
 * Open web socket connection
 * @param {http.ServerRequest} request
 * @param {Socket} socket
 * @param {Buffer} head
 * @return {void}
 */
Server.prototype.openSocket = function(request, socket, head) {

    if ('GET' === request.method &&
        (request.headers['upgrade'] && request.headers['connection']) &&
        'websocket' === request.headers.upgrade.toLowerCase() &&
        'upgrade' === request.headers.connection.toLowerCase()) {

        // Create a connection
        connection = this.connection = new Connection(request, socket, head);

        // Run ping
        setInterval(function() {

            connection.write({"type":"ping"});

        }, 10000);
    }

};