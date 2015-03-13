module.exports = {
  methodMetrics: require('./methodMetrics'),
  methodRequests: require('./methodRequests'),
  pubMetrics: require('./pubMetrics'),
  systemMetrics: require('./systemMetrics'),
};

module.exports.hosts = function (n) {
  var names = [];

  for(var i=0; i<n; ++i) {
    names[i] = 'host-' + i;
  }

  return names;
};
