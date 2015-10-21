var request = require('request');
var stats = require('./stats');
var Generator = require('./generator/');


var TOTAL_METHODS = 10;
var TOTAL_PUBSUBS = 10;
var TOTAL_METRICS = 8 + TOTAL_METHODS*9 + TOTAL_PUBSUBS*11;


function Client (appId, appSecret, host, endpoint) {
  this.appId = appId;
  this.appSecret = appSecret;
  this.host = host;
  this.endpoint = endpoint;
  this.interval = 1000*10;

  this.methods = [];
  for(var i=0; i<TOTAL_METHODS; ++i) {
    this.methods[i] = 'method-' + i;
  }

  this.pubs = [];
  for(var i=0; i<TOTAL_PUBSUBS; ++i) {
    this.pubs[i] = 'pub-' + i;
  }

  this.headers = {
    'kadira-app-id': this.appId,
    'kadira-app-secret': this.appSecret,
  };
}


Client.prototype.start = function() {
  var self = this;
  var delay = Math.floor(this.interval * Math.random());

  setTimeout(function() {
    self.send();

    setInterval(function() {
      self.send();
    }, self.interval);
  }, delay);
};


Client.prototype.send = function() {
  var time = Date.now();
  var opts = {
    method: 'POST',
    url: this.endpoint,
    headers: this.headers,
    json: true,
    body: {
      host: this.host,
      methodMetrics: Generator.methodMetrics(time, this.methods),
      methodRequests: Generator.methodRequests(time, this.methods),
      pubMetrics: Generator.pubMetrics(time, this.pubs),
      systemMetrics: Generator.systemMetrics(time),
    },
  };

  request(opts, function (err) {
    if(err) {
      console.error(err);
      return
    }

    stats.inc(TOTAL_METRICS);
    stats.dur(Date.now()-time);
  });
};


module.exports = Client;
