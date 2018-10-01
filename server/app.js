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

app.post('/convert', upload.single('shortcut'), function(req, res, next) {
	//console.log('CONVERT : ', req.body);
	// var body = req.body.name;
	// var buf = new Buffer(body.toString('binary'),'binary');

 //    convert(buf, res);
 	console.log('BODY' + JSON.stringify(req.body));
 	console.log(req.file);
 	convert(req.file, res);
 	//res.send('ok');
	//res.send('done');
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});

function convert(file, res) {

	//console.log(body);
	//var buf = Buffer.from(body);
	//
	// fs.writeFile('shortcut.plist', buf, function (err) {
	//   if (err) throw err;
	//   console.log('Saved!');
	// });

	// res.download('shortcut.plist');

	readBplist(file.path).then((data) => {

		console.log(data);
	 	

	 	fs.writeFile('shortcut.json', JSON.stringify(data), function (err) {
		  if (err) throw err;
		  res.download('shortcut.json');
		  console.log('Saved!');
		});

		

		//res.send('YOLO');

	});

	//res.send('OK');
}