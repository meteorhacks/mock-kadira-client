module.exports = function (ts) {
  var metric = {
    startTime: ts,
    endTime: ts,

    memory: 300 * Math.random(),
    sessions: Math.floor(5 * Math.random()),
    newSessions: Math.floor(5 * Math.random()),
    pcpu: 2 * Math.random(),
    pcpuUser: 1 * Math.random(),
    pcpuSystem: 1 * Math.random(),
    loadAverage: 1 * Math.random(),
    cputime: Math.floor(500 * Math.random()),
  };

  return [metric];
};
