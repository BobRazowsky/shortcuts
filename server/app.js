var express = require('express');
var readBplist = require('read-bplist');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer  = require('multer');
var request = require('request');
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
	convert(req.file, res, name);
});

app.get('/getshortcut', function(req, res, next) {
	var shortcutURL = req.query.url;
	var UUID = shortcutURL.replace('https://www.icloud.com/shortcuts/', '');

	var xhr = new XMLHttpRequest();
	xhr.open( "GET", "https://www.icloud.com/shortcuts/api/records/" + UUID, true ); // false for synchronous request

	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var resp = JSON.parse(xhr.responseText);
				var url = resp.fields.shortcut.value.downloadURL;
				var name = resp.fields.name.value;
				getJSONFromiCloud(url, name, res);
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = (e) => {
		res.send('ERROR', e);
	};

	xhr.send(null);
});

app.post('/getfromicloud', function(req, res, next) {
	var UUID = req.body.shortcutURL.replace('https://www.icloud.com/shortcuts/', '');

	var xhr = new XMLHttpRequest();
	xhr.open( "GET", "https://www.icloud.com/shortcuts/api/records/" + UUID, true ); // false for synchronous request

	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var resp = JSON.parse(xhr.responseText);
				var url = resp.fields.shortcut.value.downloadURL;
				var name = resp.fields.name.value;
				getJSONFromiCloud(url, name, res);
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = (e) => {
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
		fs.writeFile(__dirname + '/shortcut.json', JSON.stringify(data), function (err) {
			if (err) throw err;
			res.redirect('/viewer.html?short=' + name);
		});
	});

}

function createFile(content, name, res) {
	fs.writeFile(__dirname + '/shortcut.plist', content, function (err) {
		if (err) throw err;
		readPList(__dirname + '/shortcut.plist', name, res);
	});
}

function readPList(file, name, res) {
	readBplist(__dirname + '/shortcut.plist').then((data) => {
		fs.writeFile(__dirname + '/shortcut.json', JSON.stringify(data), function (err) {
			if (err) throw err;
			res.redirect('/viewer.html?short=' + name);
		});
	});
}

function getJSONFromiCloud(url, name, res) {

	var requestSettings = {
		method: 'GET',
		url: url,
		encoding: null
	};

	request(requestSettings, function(error, response, body) {
		console.log(body);
		createFile(body, name, res);
	});
}