#!/usr/bin/env node

/**
 * Module dependencies.
 */
//Importing the server logic
// require is used to import code from an external file
var app = require('../app');
// importing an external dependency
var debug = require('debug')('projnotes');
// Module that allows to communicate with a client
// using HTTP protocol
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
// Store the port info in the app
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);  (req, res) => {
  acciones }
/**
 * Listen on provided port, on all network interfaces.
 */

// Specifying the port where the server will be listening
server.listen(port);
server.on('error', onError);
// Attaching Callbacks to events
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug(`⭐⭐Listening on ${process.env.APP_URL}:${addr.port}
  ⭐⭐`);
}
