/*
 * axe
 * <cam@onswipe.com>
 */

var cluster = require('cluster'),
    events  = require('events'),
    colors  = require('colors');

var axe = new events.EventEmitter();

axe._ = {};
axe.options = {};
axe.auto = true;

axe.log = function (msg) {
  console.log('axe '.magenta + 'info '.green + msg);
}

axe.master = function (cb) {
  if (!cb || typeof cb != 'function') {
    throw Error('Must provide master function.');
  } else {
    axe._.master = cb;
  }
}

axe.worker = function (cb) {
  if (!cb || typeof cb != 'function') {
    throw Error('Must provide worker function.');
  } else {
    axe._.worker = cb;
  }
}

axe.start = function () {
  if (!cluster.isMaster) {
    if (!axe._.worker) throw Error('Must provide worker function.');
    axe._.worker();
  } else {
    var cpus = require('os').cpus(),
        numberOfWorkers;

    if (!axe._.master) {
      numberOfWorkers = cpus.length;
    } else {
      numberOfWorkers = cpus.length - 1;
    }

    axe.log('starting ' + numberOfWorkers + ' workers');

    for (var i = 0; i < numberOfWorkers; i++) {
      var worker = cluster.fork();
      worker.on('message', function (msg) {
        axe.emit('message', msg);
      });
    }

    if (axe.auto) {
      cluster.on('death', function (worker) {
        axe.log('worker ' + worker.pid + ' died. restarting.');
        cluster.fork();
      });
    }

    if (axe._.master) axe._.master();

    axe.emit('start');
  }
}

module.exports = axe;
