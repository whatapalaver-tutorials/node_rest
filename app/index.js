// Primary file for the API

// Dependencies

const http = require('http');
const url = require('url');

// Create a web server
const server = http.createServer(function(req, res) {

  // Get and parse the URL
  let parsedUrl = url.parse(req.url, true);
  // Get the path from the URL
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Choose the request handler
  let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

  // Route the request to the specified handler
  chosenHandler(function(statusCode, message) {
    // Use the status code called back by handler or default to 200
    statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
    messageJson = JSON.stringify(message)
    // Return the response
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(statusCode)
    res.end(messageJson);
  })
})

// Start the web server
server.listen(3000, function() {
  console.log("Listening on port 3000")
})

// Define the route handlers
const handlers = {};

// Hello handler
handlers.hello = function(callback) {
  callback(200, {'message' : 'Hello to the whole wide world!'})
}

// Not found handler
handlers.notFound = function(callback) {
  callback(404, {'message' : 'That request is not recognised'});
};

// Define the router
const router = {
  'hello' : handlers.hello
}