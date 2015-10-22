var os = require('os');
var cluster = require('cluster');
var Client = require('./client');

if(!process.env.ENDPOINTS) {
  process.env.ENDPOINTS = 'http://localhost:11011';
}

// start node cluster with number of cpus
if(cluster.isMaster) {
  for (var i = 0, n = os.cpus().length; i < n; ++i) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    console.log('Cluster: worker online', worker.id);
  });

  cluster.on('exit', function (worker) {
    console.log('Cluster: worker exit', worker.id);
    cluster.fork();
  });

  // do not start the app on cluster master
  return;
}

var MAX_CLIENTS = 10000;
var NUM_CLIENTS = parseInt(process.env.N)/os.cpus().length || 1;
var ENDPOINTS = process.env.ENDPOINTS.split(',');
var APP_ID = process.env.APP_ID;
var APP_SECRET = process.env.APP_SECRET;

ENDPOINTS.forEach(function (endpoint) {
  for(var i=0; i<NUM_CLIENTS; ++i) {
    var appId = APP_ID || 'test-app-' + Math.floor(MAX_CLIENTS * Math.random());
    var appSecret = APP_SECRET || 'test-app-secret';
    var hostname = 'host-' + Math.floor(Math.random() * 1000000000);
    var client = new Client(appId, appSecret, hostname, endpoint);
    client.start();
  }
});
