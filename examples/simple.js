var axe = require('../');

axe.master(function(){
  axe.on('message', function(msg){
    console.log(msg);
  });
});

axe.worker(function(){
  setInterval(function(){
    process.send(process.pid + ' alive!');
    console.log('All processes share STDIN!');
  }, 1000);
});

axe.on('start', function(){
  console.log('axe started!');
});

axe.start();
