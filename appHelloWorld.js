var http    = require('http');
var fs      = require('fs');

http.createServer(function(req, res) {
    let name = require('url').parse(req.url, url).query.name;
    if (name === undefined) 
        name = 'world';
    if(name === 'burningbird') {
        let file = 'phoenix.png';
        fs.stat(file, function(err, stat) {
            if(err) {
                console.error(err);
                res.writeHead(200, {'content-type':'text/plain'});
                res.end("Sorry, Burningbird isn't around right now \n");
            } else {
                let img = fs.readFileSync(file);
                res.contentType   = 'image/png';
                res.contentLength = stat.size;
                res.end(img, 'binary'); 
            }
        })
    } else {
        res.writeHead({'content-type':'text/plain'});
        res.end('Hello '+name+'\n');
    }
}).listen(8124);

console.log('Server running at port 8124/');