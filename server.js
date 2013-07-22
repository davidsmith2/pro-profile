var express = require('express'),
    https = require('https'),
    fs = require('fs');

var protocol = 'https',
    port = 8443;

var credentials = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};

var app = express();

app
    .use(express.static('app'))
    .use('/js/lib/', express.static('node_modules/requirejs/'))
    .use('/node_modules', express.static('node_modules'))
    .use('/test', express.static('test/'))
    .use('/test', express.static('app'));

https.createServer(credentials, app).listen(port, function () {
    console.log('Running on ' + protocol + '//localhost:' + port);
});