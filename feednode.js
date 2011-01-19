var app = require('express').createServer();
var socket = require('socket.io').listen(app);

require('jade');

app.set('view engine', 'jade');
app.set('view options', {layout: false});

//js+css files
app.get('/*.(js|css)', function(req, res){
  res.sendfile("./public"+req.url);
});

app.get('/', function(req, res){
	res.render('index');	
});

var activeClients = 0;

function clientDisconnect(client){
  activeClients -=1;
  client.broadcast({clients:activeClients})
}

function sendNewItems(){
  socket.broadcast({item:"<li>test item</li>", category:"test category"}); 
}

socket.on('connection', function(client){ 
  activeClients +=1;
  socket.broadcast({clients:activeClients})
  client.on('disconnect', function(){clientDisconnect(client)});
}); 

app.listen(3000)

//update messages on a timer - this method is preferrable to setInterval for our purposes
setTimeout(function(){
  sendNewItems();
  setTimeout(arguments.callee, 1000);
}, 1000);
