
/**
 * Serve the static js
 * @type {void}
 */
var http = require('http'),
    fs = require('fs');
http.createServer(function (request, response) {
     
    fs.readFile('./node_modules/socket.io/lib/socket.io.js', function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });
     
}).listen(1234);


var io = require('socket.io'),
    socket = io.listen(6789),

    Message = require('./lib/message'),
    Store = require('./lib/store'),
    Topic = require('./lib/topic'),
    User = require('./lib/user'),

    users = new Store(),
    topics = new Store();

