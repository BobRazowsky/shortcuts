var express = require('express');
var readBplist = require('read-bplist');
var bodyParser = require('body-parser');
var fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/convert', function(req, res) {
	//console.log('CONVERT : ', req.body);

	let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        convert(body, res);
    });

	//res.send('done');
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});

function convert(body, res) {

	//console.log(body);
	//var buf = Buffer.from(body);
	//
	fs.writeFile('shortcut.plist', body, function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});

	res.download('shortcut.plist');

	// readBplist('shortcut.plist').then((data) => {

	// 	console.log(data);
	//  	res.send('OK');
	// });

	//res.send('OK');
}