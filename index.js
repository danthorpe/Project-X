
/**
 * Serve the static js
 * @type {void}
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
 
var server = http.createServer(function (request, response) {
     
    var filePath = './node_modules/socket.io/lib' + request.url;
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(6789);


var io = require('socket.io'),
    socket = io.listen(server),

    Message = require('./lib/message'),
    Store = require('./lib/store'),
    Topic = require('./lib/topic'),
    User = require('./lib/user'),

    users = new Store(),
    topics = new Store();

