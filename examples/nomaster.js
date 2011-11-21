var axe = require('../');

axe.worker(function(){
  setInterval(function(){
    console.log('Hello from ' + process.pid + '!');
  }, 1000);
});

axe.start();
