var express = require('express');
var readBplist = require('read-bplist');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.post('/convert', function(req, res) {
	console.log('CONVERT : ', req, res);
	// readBplist('path/to/your.bplist').then((data) => {
	// 	console.log(data);
	//   //res.send(data);
	// });
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});