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

app.listen(3000)
