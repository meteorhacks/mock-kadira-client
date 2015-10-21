var val = 0;
var res = {
  val: 0,
  num: 0,
};

function inc(n) {
  val += n;
}

function dur(ms) {
  res.val += ms;
  res.num++;
}

setInterval(function () {
  var avg = Math.floor(res.val/res.num);
  console.log("%d at %d ms res", val, avg);

  val = 0;
  res.val = 0;
  res.num = 0;
}, 1000);

module.exports = {
  inc: inc,
  dur: dur,
};
