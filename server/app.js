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
	var name = req.file.originalname;
	console.log('FILE', req.file);
	convert(req.file, res, name);
});

app.post('/getfromicloud', function(req, res, next) {
	console.log('FILE', req);
	res.send('OK');
});

app.get('/downloadshortcut', function(req, res, next) {
	res.download(__dirname + '/shortcut.json', 'shortcut.json');
});

app.get('/shortcut', function(req, res) {
	res.sendFile(__dirname + '/shortcut.json', {}, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Retrieved shortcut');
		}
	});
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});

function convert(file, res, name) {

	readBplist(file.path).then((data) => {

		console.log(data);

		fs.writeFile(__dirname + '/shortcut.json', JSON.stringify(data), function (err) {
			if (err) throw err;
			//res.download('shortcut.json');

			res.redirect('/viewer.html?short=' + name);

			console.log('Saved!');
		});

	});

}