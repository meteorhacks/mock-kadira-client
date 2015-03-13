var Client = require('./client');

var NUM_CLIENTS = parseInt(process.env.N) || 1000;
var ENDPOINT = process.env.ENDPOINT || 'http://localhost:8000';
var APP_ID = process.env.APP_ID;
var APP_SECRET = process.env.APP_SECRET;

for(var i=0; i<NUM_CLIENTS; ++i) {
  var appId = APP_ID || 'test-app-' + Math.floor(1000 * Math.random());
  var appSecret = APP_SECRET || 'test-app-secret';
  var hostname = 'host-' + Math.floor(Math.random() * 1000000000);
  var client = new Client(appId, appSecret, hostname);
  client.start(ENDPOINT);
}
