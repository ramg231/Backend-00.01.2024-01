/*var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  console.log(q);
  var txt = q.year + " del mes " + q.month;
  res.end(txt);
}).listen(8080);*/

/*var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('detalle.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
});
}).listen(8080);*/

/*var fs = require('fs');
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
     if (err) throw err;
     console.log('Saved!');
   });*/

/*fs.open('mynewfile2.txt', 'w', function (err, file) {
     if (err) throw err;
     console.log('Saved!');
});*/

/*fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
     if (err) throw err;
     console.log('Saved!');
});*/

/*fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
    if (err) throw err;
    console.log('Updated!');
});*/

/*fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
    if (err) throw err;
    console.log('Replaced!');
});*/

/*fs.unlink('mynewfile2.txt', function (err) {
     if (err) throw err;
     console.log('File deleted!');
});*/

/*fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
     if (err) throw err;
     console.log('File Renamed!');
});*/

/*var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'*/

/*var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
   var q = url.parse(req.url, true);
   var filename = "." + q.pathname;
   fs.readFile(filename, function(err, data) {
     if (err) {
       res.writeHead(404, {'Content-Type': 'text/html'});
       return res.end("404 Not Found");
     } 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(data);
     return res.end();
   });
}).listen(8080);*/

/*var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end();
}).listen(8080);*/

/*var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}
var myEventHandler2 = function () {
    console.log('escuche un grito!');
  }

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);
eventEmitter.on('grito', myEventHandler2);

//Fire the 'scream' event:
eventEmitter.emit('scream');*/