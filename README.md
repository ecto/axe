# axe

# install

    npm install axe

    not yet

# usage

````javascript
var axe = require('axe');

axe.configure({
  bolt: true
});

axe.master(function(node){
  setInterval(function(){
    node.emit('ping');
  });
});

axe.worker(function(node){
  node.on('ping', function(){
    console.log(node.id + ' ' + pong);
  });
});

axe.start(function(){
  console.log('axe started on port ' + this.port);
});

axe.on('error', function(e){
  console.log(e);
});
````
