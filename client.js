var request = require('request');
var Generator = require('./generator/');


function Client (appId, appSecret, host) {
  this.appId = appId;
  this.appSecret = appSecret;
  this.host = host;
  this.interval = 1000*20;

  this.methods = this._createMethodNames();
  this.pubs = this._createPubNames();
  this.headers = {
    'kadira-app-id': this.appId,
    'kadira-app-secret': this.appSecret,
  };
}


Client.prototype.start = function(endpoint) {
  var self = this;

  var startupDelay = Math.floor(this.interval * Math.random());

  setTimeout(function() {
    self.send(endpoint);

    setInterval(function() {
      self.send(endpoint);
    }, self.interval);
  }, startupDelay);
};


Client.prototype.send = function(endpoint) {
  var cb = Function.prototype;
  var data = this._createPayload();

  request({
    url: endpoint,
    method: 'POST',
    headers: this.headers,
    body: data,
    json: true,
  }, cb);
};


Client.prototype._createMethodNames = function() {
  var names = [];

  for(var i=0; i<10; ++i) {
    names[i] = 'method-' + i;
  }

  return names;
};


Client.prototype._createPubNames = function() {
  var names = [];

  for(var i=0; i<10; ++i) {
    names[i] = 'pub-' + i;
  }

  return names;
};


Client.prototype._createPayload = function() {
  var ts = Date.now();

  return {
    host: this.host,
    methodMetrics: Generator.methodMetrics(ts, this.methods),
    methodRequests: Generator.methodRequests(ts, this.methods),
    pubMetrics: Generator.pubMetrics(ts, this.pubs),
    systemMetrics: Generator.systemMetrics(ts),
  };
};


module.exports = Client;
