
/**
 * Import dependencies
 */
var net    = require('net'),
    http   = require('http'),
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

    this.http = new http.Server().listen(port);
    this.tcp  = new net.Server().listen(port-1);

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
     * @return {void}
     */
    this.http.on('upgrade', function(request, socket) {

        if ('GET' === request.method &&
            (request.headers['upgrade'] && request.headers['connection']) &&
            'websocket' === request.headers.upgrade.toLowerCase() &&
            'upgrade' === request.headers.connection.toLowerCase()) {

            self.openSocket(socket);

        }

    });

    /**
     * Serve tcp connection event
     * @return {void}
     */
    this.tcp.on('connection', function(socket) {

        self.emit('open', socket);

        self.openSocket(socket);

    });
};

/**
 * Open web socket connection
 * @param {Socket} socket
 * @return {void}
 */
Server.prototype.openSocket = function(socket) {

    connection = new Connection(socket);

    // Run ping
    setInterval(function() {

        connection.write({"type":"ping"});

    }, 10000);

};