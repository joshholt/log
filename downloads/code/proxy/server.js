/*globals __dirname*/
require('http').createServer(require('stack/stack')(
	require('middleware/mount')('GET', '/_proxy', require('proxy')),
	require('middleware/mount')('POST', '/_proxy', require('proxy')),
	require('middleware/mount')('PUT', '/_proxy', require('proxy')),
	require('middleware/mount')('DELETE', '/_proxy', require('proxy')),
  require('middleware/static')('/', __dirname + "/public", "index.html")
)).listen(8080);
console.log("Your site and services are available @ http://0.0.0.0:"+ 8080);