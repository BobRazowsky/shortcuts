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
 	console.log('BODY' + JSON.stringify(req.body));
 	console.log(req.file);
 	convert(req.file, res);
});

app.get('/shortcut', function(req, res) {
	
});

app.listen(port, function() {
	console.log('Listening app on port ' + port);
});

function convert(file, res) {

	readBplist(file.path).then((data) => {

		console.log(data);
	 	

	 	fs.writeFile('shortcut.json', JSON.stringify(data), function (err) {
		  if (err) throw err;
		  //res.download('shortcut.json');

		  res.sendFile(__dirname + 'shortcut.json', {}, function (err) {
		    if (err) {
		      console.log(err);
		    } else {
		      console.log('Retrieved shortcut');
		    }
		  });

		  console.log('Saved!');
		});

	});

}