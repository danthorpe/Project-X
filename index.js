
var io = require('socket.io'),
    socket = io.listen(6789),

    Message = require('./lib/message'),
    Store = require('./lib/store'),
    Topic = require('./lib/topic'),
    User = require('./lib/user'),

    users = new Store(),
    topics = new Store();

