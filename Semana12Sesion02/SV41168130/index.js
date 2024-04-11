var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {    
    console.log(req.url);
    switch (req.url) {        
        case '/':
            console.log(req.url);
            fs.readFile('index.html', function(err, data) {
                if(err){
                    res.writeHead(404, {'Content-Type': 'text-html'});
                    return res.end('404 Not found');
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
            break;
        case '/index':
            break;
        default:
            break;
    }


}).listen(8080);