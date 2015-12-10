var os = require('os');
var cluster = require('cluster');
var Client = require('./client');
var Stats = require('./stats');

if (!process.env.ENDPOINTS) {
  process.env.ENDPOINTS = 'http://localhost:11011';
}

var MAX_CLIENTS = parseInt(process.env.MAX) || 10000;
var NUM_CLIENTS = parseInt(process.env.NUM) / os.cpus().length || 1;
var ENDPOINTS = process.env.ENDPOINTS.split(',');
var APP_ID = process.env.APP_ID;
var APP_SECRET = process.env.APP_SECRET;

// start node cluster with number of cpus
if (cluster.isMaster) {
  spawn();
} else {
  start();
}

function spawn() {
  for (var i = 0, n = os.cpus().length; i < n; ++i) {
    var worker = cluster.fork();
    worker.on('message', function(msg) {
      Stats.inc(msg.val);
      Stats.dur(msg.res.val, msg.res.num);
    });
  }

  cluster.on('online', function(worker) {
    console.log('Cluster: worker online', worker.id);
  });

  cluster.on('exit', function(worker) {
    console.log('Cluster: worker exit', worker.id);
    cluster.fork();
  });
}

function start() {
  ENDPOINTS.forEach(function(endpoint) {
    for (var i = 0; i < NUM_CLIENTS; ++i) {
      var appId = APP_ID || 'test-app-' + Math.floor(MAX_CLIENTS * Math.random());
      var appSecret = APP_SECRET || 'test-app-secret';
      var hostname = 'host-' + Math.floor(Math.random() * 1000000000);
      var client = new Client(appId, appSecret, hostname, endpoint);
      client.start();
    }
  });
}
