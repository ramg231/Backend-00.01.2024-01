var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    console.log(req.url)
    switch (req.url) {
        case '/':
            fs.readFile("index.html", function(err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
                });
            break;
        case '/menu':
            fs.readFile("menu.html", function(err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
                });
            break;
        case '/crear':
                fs.readFile("crear.html", function(err, data) {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        return res.end("404 Not Found");
                    } 
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end();
                    });
                break;
        default:
            
            break;
    }

  
}).listen(8080);