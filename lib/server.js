
/**
 * Import dependencies
 */
var http   = require('http'),
    util   = require('util'),
    events = require('events'),

    Connection = require('./connection'),
    WriteableStore = require('./store/writeable');

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
    this.connections = new WriteableStore();

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
 * @return {Connection}
 */
Server.prototype.openSocket = function(request, socket, head) {

    if ('GET' === request.method &&
        (request.headers['upgrade'] && request.headers['connection']) &&
        'websocket' === request.headers.upgrade.toLowerCase() &&
        'upgrade' === request.headers.connection.toLowerCase()) {

        // Create a connection
        var connection  = new Connection(request, socket, head),
            connections = this.connections;

        // Add connection to storage
        this.connections.attach(connection);

        // Run ping
        setInterval(function() {

            connections.write({"type":"ping" + i});

        }, 2000);

        return connection;
    }

};