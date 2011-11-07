# axe

# install

    npm install axe

    not yet

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

axe.start(function(){
  console.log('axe started on port ' + this.port);
});

axe.on('error', function(e){
  console.log(e);
});
````

````javascript
var axe = require('axe');

axe.configure(require('config/axe.js'));
axe.master(require('master/main.js'));
axe.master(require('worker/main.js'));
````
