var connect = require('connect'),
    fs = require('fs'),
    https = require('https'),
    app;

var protocol = 'https',
    port = 8443;

var options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};

app = connect()
    .use(connect.static('app'))
    .use('/js/lib/', connect.static('node_modules/requirejs/'))
    .use('/node_modules', connect.static('node_modules'))
    .use('/test', connect.static('test/'))
    .use('/test', connect.static('app'));

https.createServer(options, app).listen(port, function () {
    console.log('Running on ' + protocol + '//localhost:' + port);
});