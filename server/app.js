var express = require('express');
var readBplist = require('read-bplist');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer  = require('multer');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
	console.log('link', req.body.shortcutURL);
	var UUID = req.body.shortcutURL.replace('https://www.icloud.com/shortcuts/', '');

	var xhr = new XMLHttpRequest();
	xhr.open( "GET", "https://www.icloud.com/shortcuts/api/records/" + UUID, true ); // false for synchronous request
	xhr.responseType = "text";

	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				//var resp = JSON.parse(xhr.responseText);
				//var url = resp.fields.shortcut.value.downloadURL;
				//console.log(xhr.responseText);
				console.log(xhr.responseText);
				res.send('OK');
				//getJSONFromiCloud(url, res);
				//res.send(url);
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = (e) => {
		console.error(xhr.statusText);
		res.send('ERROR', e);
	};

	xhr.send(null);
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

function createFile(content, res) {
	fs.writeFile(__dirname + '/shortcut.plist', content, function (err) {
		if (err) throw err;

		console.log('Saved!');

		res.download(__dirname + '/shortcut.plist');

		//readPList('shortcut.plist', res);

		
	});
}

function readPList(file, res) {
	readBplist(__dirname + '/shortcut.plist').then((data) => {

		console.log('DATA', data);

		fs.writeFile(__dirname + '/shortcut.json', JSON.stringify(data), function (err) {
			if (err) throw err;
			//res.download('shortcut.json');

			res.redirect('/viewer.html');

			console.log('DONE!');
		});

	});
}

function getJSONFromiCloud(url, res) {
	var xhr = new XMLHttpRequest();
	xhr.open( "GET", url, true ); // false for synchronous request

	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var resp = xhr.responseText;
				createFile(resp, res);
				console.log(resp);
				//res.send(resp);
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = (e) => {
		console.error(xhr.statusText);
		res.send('ERROR', e);
	};

	xhr.send(null);
}