
/**
 * Import dependencies
 */
var util   = require('util'),
    events = require('events');

/**
 * Export the constructor
 */
exports = module.exports = Connection;

/**
 * Inherit EventEmitter
 */
util.inherits(Connection, events.EventEmitter);

/**
 * Connection
 * @param {http.ServerRequest} request
 * @param {Socket} socket
 * @param {Buffer} head
 */
function Connection(request, socket, head) {

    var self = this;

    this.request = request;
    this.socket  = socket;
    this.head    = head;

    this.socket.setTimeout(0);
    this.socket.setKeepAlive(true, 0);
    this.socket.setNoDelay(true);

    this.handshake();

};

/**
 * Write to the connection
 * @param {string|object} data
 * @param {string} encoding
 * @return {boolean}
 */
Connection.prototype.write = function(data, encoding) {

    var encoding = encoding || 'utf8',
        byteLength,
        bytes;

    if ('object' === typeof data)
    {
        data = JSON.stringify(data);
    }

    byteLength = Buffer.byteLength(data, encoding),
    bytes = new Buffer(byteLength + 2);

    bytes[0] = 0x00;
    bytes.write(data, 1, encoding);
    bytes[byteLength + 1] = 0xFF;

    return this.socket.write(bytes + '\r\n');

};

/**
 * Complete client-server handshake
 * @return {boolean}
 */
Connection.prototype.handshake = function() {

    var headers = 'HTTP/1.1 101 WebSocket Protocol Handshake\r\n' +
                  'Connection: Upgrade\r\n' +
                  'Upgrade: WebSocket\r\n';

    return this.socket.write(headers, 'utf8');

};