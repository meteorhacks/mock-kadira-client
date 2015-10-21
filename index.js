var Client = require('./client');

if(!process.env.ENDPOINTS) {
  process.env.ENDPOINTS = 'http://localhost:11011';
}

var MAX_CLIENTS = 1000;
var NUM_CLIENTS = parseInt(process.env.N) || 1;
var ENDPOINTS = process.env.ENDPOINTS.split(',');
var APP_ID = process.env.APP_ID;
var APP_SECRET = process.env.APP_SECRET;

ENDPOINTS.forEach(function (endpoint) {
  for(var i=0; i<NUM_CLIENTS; ++i) {
    var appId = APP_ID || 'test-app-' + Math.floor(MAX_CLIENTS * Math.random());
    var appSecret = APP_SECRET || 'test-app-secret';
    var hostname = 'host-' + Math.floor(Math.random() * 1000000000);
    var client = new Client(appId, appSecret, hostname);
    client.start(endpoint);
  }
});
