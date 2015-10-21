module.exports = function (ts, names) {
  var pubs = {};

  for(var i=0; i<names.length;++i) {
    pubs[names[i]] = {
      subs: Math.floor(50 * Math.random()),
      unsubs: Math.floor(50 * Math.random()),
      resTime: Math.floor(500 * Math.random()),
      lifeTime: Math.floor(5000 * Math.random()),
      totalObserverHandlers: Math.floor(50 * Math.random()),
      totalObservers: Math.floor(50 * Math.random()),
      cachedObservers: Math.floor(50 * Math.random()),
      createdObservers: Math.floor(50 * Math.random()),
      deletedObservers: Math.floor(50 * Math.random()),
      avgObserverReuse: Math.floor(50 * Math.random()),
      errors: Math.floor(10 * Math.random()),
    };
  }

  var metric = {
    startTime: ts,
    endTime: ts,
    pubs: pubs,
  };

  return [metric];
};
