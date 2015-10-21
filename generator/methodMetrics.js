module.exports = function (ts, names) {
  var methods = {};

  for(var i=0; i<names.length;++i) {
    methods[names[i]] = {
      wait: Math.floor(100 * Math.random()),
      db: Math.floor(300 * Math.random()),
      http: Math.floor(100 * Math.random()),
      email: Math.floor(100 * Math.random()),
      async: Math.floor(100 * Math.random()),
      compute: Math.floor(100 * Math.random()),
      total: Math.floor(1000 * Math.random()),
      errors: Math.floor(100 * Math.random()),
      count: Math.floor(100 * Math.random()),
    };
  }

  var metric = {
    startTime: ts,
    endTime: ts,
    methods: methods,
  };

  return [metric];
};
