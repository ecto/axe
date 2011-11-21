# axe

SHOW YOUR CLUSTER WHO'S BOSS

![axe](http://i.imgur.com/ONr16.png)

# install

    npm install axe

# usage

````javascript
var axe = require('axe');

axe.configure({
  mesh: true,
  autobalance: true,
});

axe.master(function(node, mesh){
  setInterval(function(){
    mesh.emit('ping');
  });
});

axe.worker(function(node, mesh){
  mesh.on('ping', function(){
    console.log(node.id + ' ' + pong);
  });
});

axe.on('start', function(){
  console.log('axe started on port ' + this.port);
});

axe.start();
````

````javascript
var axe = require('axe');

axe.configure(require('config/axe.js'));
axe.master(require('master/main.js'));
axe.worker(require('worker/main.js'));
axe.start();
````
