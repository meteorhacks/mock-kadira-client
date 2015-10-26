var cluster = require('cluster');

var val = 0;
var res = {
  val: 0,
  num: 0,
};

function inc(n) {
  val += n;
}

function dur(ms, n) {
  res.val += ms;
  res.num += (n || 1);
}

function log() {
  var avg = Math.floor(res.val / res.num);
  console.log("%d at %d ms res", val, avg);
  clr();
}

function rec() {
  process.send({
    val: val,
    res: res
  });

  clr();
}

function clr() {
  val = 0;
  res.val = 0;
  res.num = 0;
}

if (cluster.isMaster) {
  setInterval(log, 1000);
} else {
  setInterval(rec, 100);
}

module.exports = {
  inc: inc,
  dur: dur,

  val: val,
  res: res,
};
