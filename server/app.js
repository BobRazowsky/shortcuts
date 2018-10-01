var express = require('express');
var readBplist = require('read-bplist');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer  = require('multer');

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static('public'));

var upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/convert', upload, function(req, res) {
	//console.log('CONVERT : ', req.body);
	// var body = req.body.name;
	// var buf = new Buffer(body.toString('binary'),'binary');

 //    convert(buf, res);
 	console.log('BODY' + JSON.stringify(req.body));
 	res.send('ok');
	//res.send('done');
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});

function convert(buf, res) {

	//console.log(body);
	//var buf = Buffer.from(body);
	//
	fs.writeFile('shortcut.plist', buf, function (err) {
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