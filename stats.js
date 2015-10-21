var value = 0;

function inc(n) {
  value += n;
}

setInterval(function () {
  console.log(value);
  value = 0;
}, 1000);

module.exports = {
  inc: inc,
};
