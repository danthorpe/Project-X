
/**
 * Import dependencies
 */
var Server = require('./lib/server');

/**
 * Create the server instance
 */
new Server(6789).on('open', function() {

    console.log('Client connection created');

});