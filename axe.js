/*
 * axe
 * <cam@onswipe.com>
 */

var cluster = require('cluster'),
    events = require('events'),
    util = require('util');

var axe = new events.EventEmitter();
    
axe._ = {};

axe.configure = function () {

}

axe.master = function (cb) {
  // TODO fall back to worker.
  if (!cb || typeof cb != 'function') {
    throw Error('Must provide master function.');
  } else {
    axe._.master = cb;
  }
}

axe.worker = function (cb) {
  // Kill the program if there is no worker
  if (!cb || typeof cb != 'function') {
    throw Error('Must provide worker function.');
  } else {
    axe._.worker = cb;
  }
}

axe.start = function () {
  if (cluster.isMaster) {

    for (var i = 0; i < 2; i++) {
      var worker = cluster.fork();
      worker.on('message', function (msg) {
        axe.emit('message', msg);
      });
    }

    if (axe.auto) {
      cluster.on('death', function (worker) {
        console.log('worker ' + worker.pid + ' died. restart...');
        cluster.fork();
      });
    }

    if (axe._.master) {
      axe._.master();
    }

    axe.emit('start');

  } else {

    if (!axe._.worker) {
      throw Error('Must provide worker function.');
    }

    axe._.worker();

  }

}

module.exports = axe;
