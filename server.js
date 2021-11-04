const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);


    res.setHeader('Content-Type', 'text/html');

    let path = './view';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case './about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }else {
           // res.write(data);
           res.statusCode = 200;
            res.end(data);
        }
    })
    
});

 server.listen(4000, () => {
     console.log('ai we listing now');
 });