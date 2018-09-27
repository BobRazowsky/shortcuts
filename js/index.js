var fs = require('fs');
var plist = require('plist');
 
var obj = plist.parse(fs.readFileSync('Cryptocompare.plist', 'utf8'));
console.log(JSON.stringify(obj));