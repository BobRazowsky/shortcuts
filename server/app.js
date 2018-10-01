var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//   res.send('test');
// });

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});