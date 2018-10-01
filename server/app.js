var express = require('express');
var readBplist = require('read-bplist');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/convert', function(req, res) {
	console.log('CONVERT : ', req.body);
	// readBplist('path/to/your.bplist').then((data) => {
	// 	console.log(data);
	//   //res.send(data);
	// });
	res.send('done');
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});