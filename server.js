var express,
    https,
    fs,
    options,
    app;

// define dependencies
express = require('express');
https = require('https');
fs = require('fs');

// ssl cert info
options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// create a new expressjs app
app = express();

app
    .use(express.static('app'))
    .use('/js/lib/', express.static('node_modules/requirejs/'))
    .use('/node_modules', express.static('node_modules'))
    .use('/test', express.static('test/'))
    .use('/test', express.static('app'));

https.createServer(options, app).listen(8080, function () {
	console.log('Running on https://localhost:8080');
});
