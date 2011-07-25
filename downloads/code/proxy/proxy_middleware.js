// A Super Simple Proxy
var HTTP = require('http');
var HTTPS = require('https');
var Url = require("url");

module.exports = function(request, response, next) {
  var proxy_request = null;
  var host  = Url.parse(Url.parse(request.url,true).query.host);
  
  var options = {
    host: host.hostname,
    port: host.protocol === 'https' ? 443 : (host.port || 80),
    path: host.pathname,
    method: request.method
  };
  
  if (host.protocol === 'https') {
    proxy_request = HTTPS.request(options, function(res) {
      res.addListener("data", function(chunk) {
          response.write(chunk);
      });
      res.addListener("end", function() {
          response.end();
      });
      response.writeHead(res.statusCode, res.headers);
    }); 
    proxy_request.end();
  } else {
    proxy_request = HTTP.request(options, function(res) {
      res.addListener("data", function(chunk) {
          response.write(chunk);
      });
      res.addListener("end", function() {
          response.end();
      });
      response.writeHead(res.statusCode, res.headers);
    }); 
    proxy_request.end();
  }
};