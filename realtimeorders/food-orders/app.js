var http = require('http'),
	fs = require('fs'),
	express = require("express"),
	app = express(),
    server = http.createServer(app).listen(1337),
	io = require('socket.io');

	
io = io.listen(server);
app.configure(function () {
    app.use( express.static(__dirname+'/public') );
});	

function makeRestCall(){
	var options = {
		host: "localhost",
		port: 3000,
		path: '/orders',
		method: 'GET'
	};

	http.request(options, function(res) {
	var str = '';

 	  res.on('data', function (chunk) {
		str += chunk;
	  });

	  
	  res.on('end', function () {
		io.sockets.emit("message_to_client",{ message: str }); 
	  });
 
	}).end();
}

setInterval(function() {
		makeRestCall();	 
}, 10000);
