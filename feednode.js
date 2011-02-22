var fs = require('fs');
var filename = process.argv[2];

//fail fast if no arg was specified
if(filename == null){
  console.error("You must enter the filename of your configuration file!");
  process.exit(1);
}

//read in configuration - we want synchronous so that everything is loaded before the server starts listening
try{
  var applicationFile = JSON.parse(fs.readFileSync(filename,'utf8'));
  var applications = new Array();
  //clients don't need tokens - only name/color
  var clientSideAppList = new Array();

  applicationFile.forEach(function(app){
    applications[app.Token] = app;
    clientSideAppList.push({Name:app.Name, Color:app.Color})
  });
}catch(err){
  console.error(err.stack)
  console.error('Make sure the specified file exists and that it is formatted correctly!');
  process.exit(1);
}

var app = require('express').createServer();
var socket = require('socket.io').listen(app);
var buffer = new Array();

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

app.post('/:token/:msg', function(req, res){
  if(applications[req.params.token]){
    buffer.unshift({category:applications[req.params.token].Name ,item:req.params.msg})
    res.send('yup',200) 
  }else{
    res.send('nope',403)
  }
});

var activeClients = 0;

function clientDisconnect(client){
  activeClients -=1;
  client.broadcast({clients:activeClients})
}

function sendNewItems(){
  if(next = buffer.pop()){ 
    socket.broadcast(next); 
  }
}

socket.on('connection', function(client){ 
  activeClients +=1;
  socket.broadcast({clients:activeClients})
  client.send({apps:clientSideAppList})
  client.on('disconnect', function(){clientDisconnect(client)});
}); 

app.listen(3000)

//update messages on a timer - this method is preferrable to setInterval for our purposes
setTimeout(function(){
  sendNewItems();
  setTimeout(arguments.callee, 1000);
}, 1000);
