var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var dataset = [
  { label: 'Menus vendidos', count: 10 },
  { label: 'Menus por vender', count: 90 }
];

app.get('/dataset', function(req, res){
  res.send(JSON.stringify(dataset));
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/styles.css', function(req, res){
  res.sendFile(__dirname + '/styles.css');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('venta', function(msg){
    dataset[0].count++;
    dataset[1].count--;
    io.emit('venta', dataset);
    console.log('Menus vendidos: ', dataset[0].count);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on port :3000')
});