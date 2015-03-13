var uuid = require('uuid');

module.exports = function (ts, names) {
  var traces = [];

  for(var i=0; i<names.length;++i) {

    if(Math.random() < 0.8) {
      continue;
    }

    traces.push({
      _id: uuid.v4(),
      name: names[i],
      type: 'method',
      session: 'session',
      errorCount: Math.floor(10 * Math.random()),
      metrics: {
        wait: Math.floor(100 * Math.random()),
        db: Math.floor(300 * Math.random()),
        http: Math.floor(100 * Math.random()),
        email: Math.floor(100 * Math.random()),
        async: Math.floor(100 * Math.random()),
        compute: Math.floor(100 * Math.random()),
        total: Math.floor(1000 * Math.random()),
        errors: Math.floor(100 * Math.random()),
        count: Math.floor(100 * Math.random()),
      },
      events: [
        {type: 'start', data: {}, at: ts},
        {type: 'db', data: {coll: 'items', method: 'insert'}, at: ts},
        {type: 'dbend', data: {}, at: ts},
        {type: 'http', data: {id: 'uid', url: 'url', method: 'GET'}, at: ts},
        {type: 'httpend', data: {id: 'uid', statusCode: 200}, at: ts},
        {type: 'complete', data: {}, at: ts},
      ],
    });
  }

  return traces;
};
