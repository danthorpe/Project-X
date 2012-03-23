
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

    Message = require('./lib/message');


/**
 * Here we go...
 * @param {[type]} socket [description]
 * @return {[type]}  [description]
 */
socket.on('connection', function (socket) {

    /**
     * Incoming
     * @param {[type]} data [description]
     * @return {[type]}  [description]
     */
    socket.on('message', function (data) {

        switch(data.type.toLowerCase()) {

            case 'content':
                socket.emit('message', data);
                socket.broadcast.emit('message', data);
                break;

            case 'join':
                socket.join(data.topic);
                socket.emit('message', Message.topic(data.topic));
                socket.broadcast.emit('message', Message.connection(data.topic, data.member));
                break;

            case 'leave':
                socket.leave(data.topic);
                socket.broadcast.emit('message', Message.disconnection(data.topic, data.member));
                break;

        }

    });

    /**
     * Incoming
     * @param {[type]} data [description]
     * @return {[type]}  [description]
     */
    socket.on('connect', function (data) {

        socket.join(data.topic);
        socket.broadcast.emit('message', Message.connection(data.topic, data.member));

    });

    /**
     * Incoming
     * @param {[type]} data [description]
     * @return {[type]}  [description]
     */
    // socket.on('disconnect', function (data) {

    //     socket.leave(data.topic);
    //     socket.broadcast.emit('message', Message.disconnection(data.topic, data.member));

    // });

});