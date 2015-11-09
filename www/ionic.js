// Run this file with node to host the ionic project on the web
// Useful for testing purposes only
var connect = require('connect');
var serveStatic = require('serve-static');
// Listen on port 12000
connect().use(serveStatic(__dirname)).listen(12000)