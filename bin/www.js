#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debugLib from "debug";
import http from "http";

import app from "../app.js";
import { Server } from "socket.io";

const debug = debugLib("final-project-repo-downton-coders-backend:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Initialise Socket.io attached to the HTTP server
 */

const io = new Server(server, {
  cors: {
    "origin": "*"
  }
});

/**
 * Open socket 
 */
const messages = [];

 io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
    messages.push({"name": name,"message": message});
  })
})

/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);


server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

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
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
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
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

